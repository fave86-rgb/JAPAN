const tripDays=window.JAPAN_TRIP||[];
let userPos=null;
let mode=localStorage.getItem('jg-mode')||'full';
let done=new Set(JSON.parse(localStorage.getItem('jg-done')||'[]'));
let currentStop=null;
let currentDayIndex=Math.max(0,tripDays.findIndex(function(d){return d.id===(localStorage.getItem('jg-day')||'2027-12-28')}));
let deferredPrompt=null;
const audioTracks={fushimi:'audio/fushimi.mp3'};
let guideAudio=null;
let voiceState='idle';

const timeline=document.querySelector('#timeline');
const detail=document.querySelector('#detailDialog');
const installBtn=document.querySelector('#installBtn');
const hero=document.querySelector('#hero');

function currentDay(){return tripDays[currentDayIndex]||tripDays[0]}
function dayStops(){return (currentDay()&&currentDay().stops)||[]}
function isProtected(stop){return stop.priority==='MUST'}
function stopKey(stop){return currentDay().id+'::'+stop.id}

function renderCalendar(){
  const el=document.querySelector('#dayCalendar');
  el.innerHTML='';
  tripDays.forEach(function(day,index){
    const button=document.createElement('button');
    button.className='day-chip'+(index===currentDayIndex?' active':'')+(day.status==='BASE DEFINITA'?' defined':'');
    button.innerHTML='<span class="day-chip__date">'+day.dateLabel+'</span><strong>'+day.dayLabel+'</strong><small>'+day.city+'</small><em>'+day.status+'</em>';
    button.onclick=function(){selectDay(index)};
    el.appendChild(button);
  });
  requestAnimationFrame(function(){const a=el.querySelector('.day-chip.active');if(a)a.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})});
}

function renderHero(){
  const day=currentDay();
  document.querySelector('#heroTitle').textContent=day.heroTitle;
  document.querySelector('#heroSummary').textContent=day.summary;
  document.querySelector('#heroDistance').textContent=day.distance;
  document.querySelector('#heroDuration').textContent=day.duration;
  const must=dayStops().filter(isProtected).length;
  const variable=dayStops().length-must;
  document.querySelector('#heroPills').innerHTML='<span class="pill">'+must+' MUST</span>'+(variable?'<span class="pill pill--soft">'+variable+' VARIABILI</span>':'');
  if(day.heroImage){hero.style.backgroundImage='url("'+day.heroImage+'")';hero.classList.remove('hero--draft')}else{hero.style.backgroundImage='';hero.classList.add('hero--draft')}
}

function renderBriefings(){
  const day=currentDay();
  document.querySelector('#morningTitle').textContent='Oggi · '+day.heroTitle;
  document.querySelector('#morningText').textContent=day.briefingStart;
  const total=dayStops().length;
  const completed=dayStops().filter(function(s){return done.has(stopKey(s))}).length;
  document.querySelector('#eveningTitle').textContent=completed?('Oggi: '+completed+'/'+total+' tappe segnate'):'A fine giornata';
  document.querySelector('#eveningText').textContent=day.briefingEnd;
  document.querySelector('#tomorrowText').textContent='Domani · '+day.tomorrow;
}

function renderTimeline(){
  timeline.innerHTML='';
  const stops=dayStops();
  const visible=stops.filter(function(s){return mode==='full'||isProtected(s)});
  visible.forEach(function(s,i){
    const key=stopKey(s);
    const el=document.createElement('article');
    el.className='stop'+(done.has(key)?' done':'');
    el.innerHTML='<img src="'+s.image+'" alt="'+s.title+'"><div class="stop__body"><div class="stop__top"><span class="badge '+(s.priority==='VARIABILE'?'variable':'')+'">'+s.priority+'</span><span>'+(done.has(key)?'✓':'')+'</span></div><h3>'+s.time+' · '+s.title+'</h3><p>'+s.subtitle+'</p><div class="stop__meta"><span>⏱ '+s.duration+'</span><span>'+(i===0?'Inizio giornata':'Apri tappa')+'</span></div></div><button class="stop__tap" aria-label="Apri '+s.title+'"></button>';
    el.querySelector('button').onclick=function(){openStop(s.id)};
    timeline.appendChild(el);
  });
  const count=stops.filter(function(s){return done.has(stopKey(s))}).length;
  document.querySelector('#progressText').textContent=count+'/'+stops.length;
  document.querySelector('#programTitle').textContent=currentDay().dayLabel+' · '+currentDay().city;
  document.querySelector('#reduceBtn').textContent=mode==='must'?'🟢 Ripristina variabili':'😮‍💨 Riduci giornata';
}

function render(){renderCalendar();renderHero();renderBriefings();renderTimeline();updateWeather(false)}

function selectDay(index){
  cleanupVoice();
  currentDayIndex=index;
  currentStop=null;
  localStorage.setItem('jg-day',currentDay().id);
  mode='full';
  localStorage.setItem('jg-mode',mode);
  window.scrollTo({top:0,behavior:'smooth'});
  render();
}

function openStop(id){
  if(voiceState!=='idle')cleanupVoice();
  const s=dayStops().find(function(x){return x.id===id});
  if(!s)return;
  currentStop=s;
  document.querySelector('#detailImage').src=s.image;
  document.querySelector('#detailImage').alt=s.title;
  document.querySelector('#detailPriority').textContent=s.priority;
  document.querySelector('#detailDuration').textContent='⏱ '+s.duration;
  document.querySelector('#detailTitle').textContent=s.title;
  document.querySelector('#detailIntro').textContent=s.intro;
  document.querySelector('#detailNarration').textContent=s.narration;
  document.querySelector('#detailTip').textContent=s.tip;
  document.querySelector('#detailLook').innerHTML=s.look.map(function(x){return '<li>'+x+'</li>'}).join('');
  document.querySelector('#doneBtn').textContent=done.has(stopKey(s))?'↩ Segna come non visitato':'✓ Segna come visitato';
  detail.showModal();
}

function routeToCurrent(){
  if(!currentStop)return;
  const dest=currentStop.lat+','+currentStop.lon;
  const origin=userPos?'&origin='+userPos.lat+','+userPos.lon:'';
  window.open('https://www.google.com/maps/dir/?api=1'+origin+'&destination='+dest+'&travelmode=walking','_blank');
}

function setSpeakButton(label){const btn=document.querySelector('#speakBtn');if(btn)btn.textContent=label||'🔊 Ascolta'}
function cleanupVoice(){
  voiceState='idle';
  if(guideAudio){try{guideAudio.pause()}catch(e){};try{guideAudio.currentTime=0}catch(e){};guideAudio=null}
  setSpeakButton('🔊 Ascolta');
}
async function speak(){
  if(!currentStop)return;
  const track=audioTracks[currentStop.id];
  if(!track)return alert('La traccia audio definitiva di questa tappa non è ancora stata preparata.');
  if(guideAudio&&voiceState==='playing'){cleanupVoice();return}
  cleanupVoice();
  const audio=new Audio(track);audio.preload='auto';audio.playsInline=true;guideAudio=audio;voiceState='loading';setSpeakButton('⏳ Caricamento…');
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
  },function(){btn.textContent='📍 Usa la mia posizione';alert('Non riesco ad accedere alla posizione. Controlla i permessi del browser.')},{enableHighAccuracy:true,timeout:12000,maximumAge:60000});
}

async function updateWeather(useUser){
  const day=currentDay();
  if(!day)return;
  const p=(useUser&&userPos)?userPos:day.weather;
  try{
    const url='https://api.open-meteo.com/v1/forecast?latitude='+p.lat+'&longitude='+p.lon+'&current=temperature_2m,apparent_temperature,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=1';
    const res=await fetch(url);const w=await res.json();const code=w.current.weather_code;
    const labels={0:'sereno',1:'prevalentemente sereno',2:'parzialmente nuvoloso',3:'coperto',45:'nebbia',48:'nebbia',51:'pioviggine',53:'pioviggine',55:'pioviggine intensa',61:'pioggia debole',63:'pioggia',65:'pioggia intensa',71:'neve debole',73:'neve',75:'neve intensa',80:'rovesci',81:'rovesci',82:'rovesci intensi',95:'temporali'};
    document.querySelector('#weatherTitle').textContent=useUser?'Meteo dove sei':day.weather.label+' · meteo attuale';
    document.querySelector('#weatherTemp').textContent=Math.round(w.current.temperature_2m)+'°';
    document.querySelector('#weatherText').textContent=(labels[code]||'condizioni variabili')+' · percepita '+Math.round(w.current.apparent_temperature)+'° · pioggia max '+(w.daily.precipitation_probability_max[0]||0)+'% · '+Math.round(w.daily.temperature_2m_min[0])+'° / '+Math.round(w.daily.temperature_2m_max[0])+'°';
  }catch(e){document.querySelector('#weatherText').textContent='Meteo non disponibile. Riprova con connessione attiva.'}
}

document.querySelector('#closeDetail').onclick=function(){cleanupVoice();detail.close()};
document.querySelector('#routeBtn').onclick=routeToCurrent;
document.querySelector('#speakBtn').onclick=speak;
document.querySelector('#doneBtn').onclick=function(){
  if(!currentStop)return;
  const key=stopKey(currentStop);
  if(done.has(key))done.delete(key);else done.add(key);
  localStorage.setItem('jg-done',JSON.stringify(Array.from(done)));
  renderTimeline();renderBriefings();detail.close();
};
document.querySelector('#gpsBtn').onclick=locate;
document.querySelector('#reduceBtn').onclick=function(){mode=mode==='must'?'full':'must';localStorage.setItem('jg-mode',mode);renderTimeline()};
document.querySelector('#resetBtn').onclick=function(){dayStops().forEach(function(s){done.delete(stopKey(s))});localStorage.setItem('jg-done',JSON.stringify(Array.from(done)));renderTimeline();renderBriefings()};
document.querySelectorAll('[data-mode]').forEach(function(b){b.onclick=function(){mode=b.dataset.mode;localStorage.setItem('jg-mode',mode);renderTimeline()}});

window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferredPrompt=e;installBtn.hidden=false});
installBtn.onclick=async function(){if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null;installBtn.hidden=true}else alert('Su iPhone: Condividi → Aggiungi alla schermata Home.')};
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
render();