
const tripDays=window.JAPAN_TRIP||[];
let userPos=null;
let mode=localStorage.getItem('jg-mode')||'full';
let done=new Set(JSON.parse(localStorage.getItem('jg-done')||'[]'));
let currentItem=null;
let currentDayIndex=Math.max(0,tripDays.findIndex(function(d){return d.id===(localStorage.getItem('jg-day')||'day-1')}));
let deferredPrompt=null;
const audioTracks={fushimi:'audio/fushimi.mp3'};
let guideAudio=null;
let voiceState='idle';

const timeline=document.querySelector('#timeline');
const detail=document.querySelector('#detailDialog');
const installBtn=document.querySelector('#installBtn');
const hero=document.querySelector('#hero');

function currentDay(){return tripDays[currentDayIndex]||tripDays[0]}
function dayItems(){return (currentDay()&&currentDay().items)||[]}
function itemKey(item){return currentDay().id+'::'+item.id}
function visibleItems(){
  return dayItems().filter(function(item){return mode==='full'||item.priority==='MUST'});
}
function visitItems(){return dayItems().filter(function(item){return item.type==='visit'})}

function renderCalendar(){
  const el=document.querySelector('#dayCalendar');
  el.innerHTML='';
  tripDays.forEach(function(day,index){
    const button=document.createElement('button');
    button.className='day-chip'+(index===currentDayIndex?' active':'');
    button.innerHTML='<span class="day-chip__date">'+day.dayLabel+'</span><strong>'+day.city+'</strong><small>'+day.status+'</small>';
    button.onclick=function(){selectDay(index)};
    el.appendChild(button);
  });
  requestAnimationFrame(function(){
    const a=el.querySelector('.day-chip.active');
    if(a)a.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  });
}

function renderHero(){
  const day=currentDay();
  document.querySelector('#heroTitle').textContent=day.heroTitle;
  document.querySelector('#heroSummary').textContent=day.summary;
  document.querySelector('#heroDistance').textContent=day.distance;
  document.querySelector('#heroDuration').textContent=day.duration;
  const must=visitItems().filter(function(x){return x.priority==='MUST'}).length;
  const variable=visitItems().filter(function(x){return x.priority!=='MUST'}).length;
  document.querySelector('#heroPills').innerHTML='<span class="pill">'+must+' MUST</span>'+(variable?'<span class="pill pill--soft">'+variable+' VARIABILI</span>':'');
  if(day.heroImage){
    hero.style.backgroundImage='url("'+day.heroImage+'")';
    hero.classList.remove('hero--draft');
  }else{
    hero.style.backgroundImage='';
    hero.classList.add('hero--draft');
  }
}

function renderBriefings(){
  const day=currentDay();
  const items=dayItems();
  const completed=items.filter(function(i){return done.has(itemKey(i))}).length;
  document.querySelector('#morningTitle').textContent=day.dayLabel+' · '+day.city;
  document.querySelector('#morningText').textContent=day.briefingStart;
  document.querySelector('#eveningTitle').textContent=completed?('Oggi: '+completed+'/'+items.length+' voci completate'):'A fine giornata';
  document.querySelector('#eveningText').textContent=day.briefingEnd;
  document.querySelector('#tomorrowText').textContent='Domani · '+day.tomorrow;
}

function badgeFor(item){
  if(item.type==='visit') return item.priority;
  return item.mode||'SPOSTAMENTO';
}
function iconFor(item){
  if(item.type==='visit')return '📍';
  const mode=(item.mode||'').toUpperCase();
  if(mode.includes('A PIEDI'))return '🚶';
  if(mode.includes('METRO'))return 'Ⓜ️';
  if(mode.includes('SHINKANSEN'))return '🚅';
  if(mode.includes('GONDOLA'))return '🚡';
  if(mode.includes('BUS'))return '🚌';
  if(mode.includes('TRENO'))return '🚆';
  return '➡️';
}
function toggleDone(item){
  const key=itemKey(item);
  if(done.has(key))done.delete(key);else done.add(key);
  localStorage.setItem('jg-done',JSON.stringify(Array.from(done)));
  renderTimeline();
  renderBriefings();
}
function openMoveMap(item){
  const dest=item.destLat+','+item.destLon;
  const travel=item.mapMode==='walking'?'walking':'transit';
  let origin='';
  if(userPos)origin='&origin='+userPos.lat+','+userPos.lon;
  window.open('https://www.google.com/maps/dir/?api=1'+origin+'&destination='+dest+'&travelmode='+travel,'_blank');
}

function renderTimeline(){
  timeline.innerHTML='';
  const items=visibleItems();

  items.forEach(function(item,index){
    const key=itemKey(item);
    if(item.type==='visit'){
      const el=document.createElement('article');
      el.className='stop stop--visit'+(done.has(key)?' done':'');
      const media=item.image
        ? '<img src="'+item.image+'" alt="'+item.title+'">'
        : '<div class="stop__placeholder">'+iconFor(item)+'</div>';
      el.innerHTML=
        media+
        '<div class="stop__body">'+
          '<div class="stop__top"><span class="badge '+(item.priority==='VARIABILE'?'variable':'')+'">'+badgeFor(item)+'</span><button class="check-btn" aria-label="Segna completato">'+(done.has(key)?'✓':'○')+'</button></div>'+
          '<h3>'+item.time+' · '+item.title+'</h3>'+
          '<p>'+item.subtitle+'</p>'+
          '<div class="stop__meta"><span>⏱ '+item.duration+'</span><button class="inline-link open-detail">Apri visita</button></div>'+
        '</div>';
      el.querySelector('.check-btn').onclick=function(e){e.stopPropagation();toggleDone(item)};
      el.querySelector('.open-detail').onclick=function(e){e.stopPropagation();openVisit(item.id)};
      timeline.appendChild(el);
    }else{
      const el=document.createElement('article');
      el.className='route-card'+(done.has(key)?' done':'');
      const steps=(item.steps||[]).map(function(s){return '<li>'+s+'</li>'}).join('');
      el.innerHTML=
        '<div class="route-card__icon">'+iconFor(item)+'</div>'+
        '<div class="route-card__main">'+
          '<div class="route-card__top"><span class="route-badge">'+badgeFor(item)+'</span><button class="check-btn" aria-label="Segna completato">'+(done.has(key)?'✓':'○')+'</button></div>'+
          '<h3>'+item.time+' · '+item.title+'</h3>'+
          '<p>'+item.subtitle+'</p>'+
          '<ul class="route-steps">'+steps+'</ul>'+
          '<div class="route-card__footer"><span>⏱ '+item.duration+'</span><button class="inline-link route-map">Apri Maps</button></div>'+
        '</div>';
      el.querySelector('.check-btn').onclick=function(){toggleDone(item)};
      el.querySelector('.route-map').onclick=function(){openMoveMap(item)};
      timeline.appendChild(el);
    }
  });

  const all=dayItems();
  const count=all.filter(function(i){return done.has(itemKey(i))}).length;
  document.querySelector('#progressText').textContent=count+'/'+all.length;
  document.querySelector('#programTitle').textContent=currentDay().dayLabel+' · '+currentDay().city;
  document.querySelector('#reduceBtn').textContent=mode==='must'?'🟢 Ripristina variabili':'😮‍💨 Riduci giornata';
}

function render(){
  renderCalendar();
  renderHero();
  renderBriefings();
  renderTimeline();
  updateWeather(false);
}

function selectDay(index){
  cleanupVoice();
  currentDayIndex=index;
  currentItem=null;
  localStorage.setItem('jg-day',currentDay().id);
  mode='full';
  localStorage.setItem('jg-mode',mode);
  window.scrollTo({top:0,behavior:'smooth'});
  render();
}

function openVisit(id){
  if(voiceState!=='idle')cleanupVoice();
  const item=dayItems().find(function(x){return x.id===id&&x.type==='visit'});
  if(!item)return;
  currentItem=item;
  const imageWrap=document.querySelector('#detailImageWrap');
  const image=document.querySelector('#detailImage');
  if(item.image){
    image.src=item.image;
    image.alt=item.title;
    imageWrap.hidden=false;
  }else{
    image.removeAttribute('src');
    image.alt='';
    imageWrap.hidden=true;
  }
  document.querySelector('#detailPriority').textContent=item.priority;
  document.querySelector('#detailDuration').textContent='⏱ '+item.duration;
  document.querySelector('#detailTitle').textContent=item.title;
  document.querySelector('#detailIntro').textContent=item.intro;
  document.querySelector('#detailNarration').textContent=item.narration;
  document.querySelector('#detailTip').textContent=item.tip;
  document.querySelector('#detailLook').innerHTML=(item.look||[]).map(function(x){return '<li>'+x+'</li>'}).join('');
  document.querySelector('#doneBtn').textContent=done.has(itemKey(item))?'↩ Segna come non completato':'✓ Segna come completato';
  detail.showModal();
}

function routeToCurrent(){
  if(!currentItem)return;
  const dest=currentItem.lat+','+currentItem.lon;
  const origin=userPos?'&origin='+userPos.lat+','+userPos.lon:'';
  window.open('https://www.google.com/maps/dir/?api=1'+origin+'&destination='+dest+'&travelmode=walking','_blank');
}

function openDayRoute(){
  const visits=visitItems().filter(function(v){return mode==='full'||v.priority==='MUST'});
  if(!visits.length)return;
  const first=visits[0],last=visits[visits.length-1];
  const middle=visits.slice(1,-1);
  let origin=userPos?(userPos.lat+','+userPos.lon):(first.lat+','+first.lon);
  let url='https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(origin)+'&destination='+encodeURIComponent(last.lat+','+last.lon);
  if(middle.length)url+='&waypoints='+encodeURIComponent(middle.map(function(v){return v.lat+','+v.lon}).join('|'));
  url+='&travelmode=transit';
  window.open(url,'_blank');
}

function setSpeakButton(label){
  const btn=document.querySelector('#speakBtn');
  if(btn)btn.textContent=label||'🔊 Ascolta';
}
function cleanupVoice(){
  voiceState='idle';
  if(guideAudio){
    try{guideAudio.pause()}catch(e){}
    try{guideAudio.currentTime=0}catch(e){}
    guideAudio=null;
  }
  setSpeakButton('🔊 Ascolta');
}
async function speak(){
  if(!currentItem)return;
  const track=audioTracks[currentItem.id];
  if(!track)return alert('La traccia audio definitiva di questa tappa non è ancora stata preparata.');
  if(guideAudio&&voiceState==='playing'){cleanupVoice();return}
  cleanupVoice();
  const audio=new Audio(track);
  audio.preload='auto';
  audio.playsInline=true;
  guideAudio=audio;
  voiceState='loading';
  setSpeakButton('⏳ Caricamento…');
  audio.onplaying=function(){if(guideAudio!==audio)return;voiceState='playing';setSpeakButton('⏹ Ferma')};
  audio.onended=function(){if(guideAudio===audio)cleanupVoice()};
  audio.onerror=function(){if(guideAudio!==audio)return;cleanupVoice();alert('Non riesco a riprodurre il file audio.')};
  try{await audio.play()}catch(error){console.error(error);if(guideAudio===audio){cleanupVoice();alert('Chrome ha bloccato la riproduzione. Premi di nuovo Ascolta.')}}
}

async function locate(){
  const btn=document.querySelector('#gpsBtn');
  if(!navigator.geolocation)return alert('Geolocalizzazione non disponibile.');
  btn.textContent='📍 Localizzazione…';
  navigator.geolocation.getCurrentPosition(function(pos){
    userPos={lat:pos.coords.latitude,lon:pos.coords.longitude};
    btn.textContent='✓ Posizione attiva';
    updateWeather(true);
  },function(){
    btn.textContent='📍 Usa la mia posizione';
    alert('Non riesco ad accedere alla posizione. Controlla i permessi del browser.');
  },{enableHighAccuracy:true,timeout:12000,maximumAge:60000});
}

async function updateWeather(useUser){
  const day=currentDay();
  if(!day)return;
  const p=(useUser&&userPos)?userPos:day.weather;
  try{
    const url='https://api.open-meteo.com/v1/forecast?latitude='+p.lat+'&longitude='+p.lon+'&current=temperature_2m,apparent_temperature,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=1';
    const res=await fetch(url);
    const w=await res.json();
    const code=w.current.weather_code;
    const labels={0:'sereno',1:'prevalentemente sereno',2:'parzialmente nuvoloso',3:'coperto',45:'nebbia',48:'nebbia',51:'pioviggine',53:'pioviggine',55:'pioviggine intensa',61:'pioggia debole',63:'pioggia',65:'pioggia intensa',71:'neve debole',73:'neve',75:'neve intensa',80:'rovesci',81:'rovesci',82:'rovesci intensi',95:'temporali'};
    document.querySelector('#weatherTitle').textContent=useUser?'Meteo dove sei':day.weather.label+' · meteo attuale';
    document.querySelector('#weatherTemp').textContent=Math.round(w.current.temperature_2m)+'°';
    const summary=(labels[code]||'condizioni variabili')+' · percepita '+Math.round(w.current.apparent_temperature)+'° · pioggia max '+(w.daily.precipitation_probability_max[0]||0)+'% · '+Math.round(w.daily.temperature_2m_min[0])+'° / '+Math.round(w.daily.temperature_2m_max[0])+'°';
    document.querySelector('#weatherText').textContent=summary;
    document.querySelector('#headerWeatherLabel').textContent=(useUser?'DOVE SEI':'METEO · '+day.weather.label).toUpperCase();
    document.querySelector('#headerWeatherTemp').textContent=Math.round(w.current.temperature_2m)+'°';
    document.querySelector('#headerWeatherText').textContent=(labels[code]||'variabile')+' · percepita '+Math.round(w.current.apparent_temperature)+'°';
  }catch(e){
    document.querySelector('#weatherText').textContent='Meteo non disponibile. Riprova con connessione attiva.';
    document.querySelector('#headerWeatherText').textContent='non disponibile offline';
  }
}

document.querySelector('#closeDetail').onclick=function(){cleanupVoice();detail.close()};
document.querySelector('#routeBtn').onclick=routeToCurrent;
document.querySelector('#routeDayBtn').onclick=openDayRoute;
document.querySelector('#speakBtn').onclick=speak;
document.querySelector('#doneBtn').onclick=function(){
  if(!currentItem)return;
  toggleDone(currentItem);
  detail.close();
};
document.querySelector('#gpsBtn').onclick=locate;
document.querySelector('#reduceBtn').onclick=function(){
  mode=mode==='must'?'full':'must';
  localStorage.setItem('jg-mode',mode);
  renderTimeline();
};
document.querySelector('#resetBtn').onclick=function(){
  dayItems().forEach(function(item){done.delete(itemKey(item))});
  localStorage.setItem('jg-done',JSON.stringify(Array.from(done)));
  renderTimeline();
  renderBriefings();
};
document.querySelectorAll('[data-mode]').forEach(function(b){
  b.onclick=function(){
    mode=b.dataset.mode;
    localStorage.setItem('jg-mode',mode);
    renderTimeline();
  };
});

window.addEventListener('beforeinstallprompt',function(e){
  e.preventDefault();
  deferredPrompt=e;
  installBtn.hidden=false;
});
installBtn.onclick=async function(){
  if(deferredPrompt){
    deferredPrompt.prompt();
    deferredPrompt=null;
    installBtn.hidden=true;
  }else{
    alert('Su iPhone: Condividi → Aggiungi alla schermata Home.');
  }
};

if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
render();

