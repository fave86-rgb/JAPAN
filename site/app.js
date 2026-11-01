const stops = [
  {
    id:'fushimi', priority:'MUST', time:'08:00', duration:'2 h', title:'Fushimi Inari Taisha', subtitle:'Il santuario dei mille torii', lat:34.96714, lon:135.77267,
    image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Fushimi_Inari%2C_Kyoto%2C_20240818_1400_4476.jpg/1920px-Fushimi_Inari%2C_Kyoto%2C_20240818_1400_4476.jpg',
    intro:'Iniziamo presto: è uno dei luoghi più iconici di Kyoto e la mattina rende l’esperienza molto più piacevole.',
    look:['La porta Rōmon all’ingresso','Le statue delle volpi, messaggere di Inari','I Senbon Torii e le iscrizioni sul retro','Il punto panoramico di Yotsutsuji se avete energia'],
    narration:'Sei nel principale santuario dedicato a Inari, divinità shintoista legata al riso, alla prosperità e agli affari. Le volpi che incontri non sono Inari: sono i suoi messaggeri. I torii sono donazioni di privati e aziende; sul retro trovi il nome del donatore e la data. Il percorso sale sul monte Inari: non serve arrivare necessariamente in cima. Per una prima visita, attraversare i Senbon Torii e arrivare almeno ai santuari intermedi permette già di capire il luogo senza trasformarlo in una maratona.',
    tip:'Arrivate presto. Dopo i primi tunnel di torii, continuate ancora: la folla diminuisce rapidamente. Se siete stanchi, Yotsutsuji è un ottimo punto in cui decidere se proseguire o scendere.'
  },
  {
    id:'kiyomizu', priority:'MUST', time:'10:45', duration:'1 h 30', title:'Kiyomizu-dera', subtitle:'La terrazza sospesa su Kyoto', lat:34.99486, lon:135.78505,
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Kiyomizu-dera%2C_Kyoto%2C_November_2016_-01.jpg/1280px-Kiyomizu-dera%2C_Kyoto%2C_November_2016_-01.jpg',
    intro:'Un grande tempio buddhista costruito sul fianco della collina, famoso per la terrazza lignea e la vista sulla città.',
    look:['La porta Niō-mon salendo da Kiyomizu-zaka','La grande terrazza del padiglione principale','La struttura lignea di sostegno, senza chiodi metallici tradizionali','La cascata Otowa-no-taki'],
    narration:'Kiyomizu-dera significa letteralmente “tempio dell’acqua pura” e prende il nome dalla cascata Otowa. Il complesso nasce alla fine dell’VIII secolo e il grande padiglione principale è costruito sul pendio con una spettacolare struttura lignea. La terrazza non è soltanto un punto panoramico: fa parte di un edificio religioso ancora attivo. Durante la visita osserva il contrasto tra il padiglione e la città moderna sullo sfondo: è una delle immagini che raccontano meglio Kyoto.',
    tip:'Le app di navigazione possono suggerire accessi sbagliati: entra dalla salita di Kiyomizu-zaka verso Niō-mon. Dopo la visita non tornare indietro: prosegui a piedi verso Sannenzaka e Ninenzaka.'
  },
  {
    id:'higashiyama', priority:'MUST', time:'12:30', duration:'1 h 30', title:'Sannenzaka · Ninenzaka', subtitle:'Kyoto da percorrere lentamente', lat:34.99739, lon:135.78078,
    image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Ninenzaka.jpg/1280px-Ninenzaka.jpg',
    intro:'Qui la visita è la passeggiata stessa: vicoli, machiya, botteghe, tè e scorci del quartiere Higashiyama.',
    look:['Le facciate tradizionali delle machiya','La pagoda Yasaka/Hōkan-ji in prospettiva','Le scalinate di Sannenzaka e Ninenzaka','Piccoli negozi e case da tè laterali'],
    narration:'Higashiyama conserva uno dei paesaggi urbani più riconoscibili di Kyoto. Le case a schiera tradizionali, chiamate machiya, erano insieme abitazioni e luoghi di lavoro. Non cercare un singolo monumento: qui conviene rallentare, osservare le facciate, le insegne e i cambi di prospettiva. La zona collega naturalmente Kiyomizu-dera a Gion ed è perfetta per trasformare il trasferimento tra due attrazioni in una parte essenziale della visita.',
    tip:'È il momento ideale per pranzo e piccole soste. Evita di pianificare una tabella troppo rigida: lasciati 30 minuti di margine.'
  },
  {
    id:'nishiki', priority:'EXTRA', time:'14:30', duration:'1 h', title:'Nishiki Market', subtitle:'La cucina di Kyoto', lat:35.00502, lon:135.76536,
    image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/A_view_of_Nishiki_Market%2C_Kyoto%2C_Japan.jpg/1280px-A_view_of_Nishiki_Market%2C_Kyoto%2C_Japan.jpg',
    intro:'Extra gastronomico: oltre 100 botteghe lungo una stretta galleria storica di circa 400 metri.',
    look:['Yuba e tofu di Kyoto','Tsukemono, i sottaceti locali','Dashimaki tamago','Coltelli e utensili tradizionali'],
    narration:'Nishiki è soprannominato “la cucina di Kyoto” e la sua storia commerciale risale a circa quattro secoli fa. Qui non cerchiamo una singola specialità obbligatoria: l’interesse è vedere quanto la cucina di Kyoto sia legata alla stagionalità, alle conserve, al tofu e alle verdure locali. Ricorda che mangiare camminando è sconsigliato: consuma ciò che compri davanti al banco o negli spazi indicati.',
    tip:'Se siete in ritardo o stanchi, questo è il primo punto da eliminare. Se lo fate, un’ora è sufficiente.'
  },
  {
    id:'yasaka', priority:'EXTRA', time:'16:00', duration:'35 min', title:'Yasaka-jinja', subtitle:'Il santuario alle porte di Gion', lat:35.00368, lon:135.77856,
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yasaka_Shrine_in_Kyoto%2C_20240820_1718_5175.jpg/1280px-Yasaka_Shrine_in_Kyoto%2C_20240820_1718_5175.jpg',
    intro:'Una tappa breve e naturale prima di Gion, soprattutto se state arrivando da Higashiyama.',
    look:['La grande porta occidentale','Il palco con le lanterne','I rituali di preghiera','Il passaggio verso Maruyama Park'],
    narration:'Yasaka-jinja è uno dei santuari più importanti di Kyoto ed è profondamente legato al quartiere di Gion. È famoso soprattutto per il Gion Matsuri, uno dei festival più celebri del Giappone. Anche in una visita breve vale la pena osservare le lanterne e il modo in cui il santuario resta parte della vita quotidiana della città, non soltanto un monumento storico.',
    tip:'È aperto e piacevole anche verso sera. Se avete saltato Nishiki, qui potete arrivare con molta più calma.'
  },
  {
    id:'gion', priority:'MUST', time:'17:00', duration:'1 h 30', title:'Gion al tramonto', subtitle:'Hanamikoji e Shirakawa', lat:35.0032, lon:135.7753,
    image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/150124_Gion_Kyoto_Japan01s3.jpg/1280px-150124_Gion_Kyoto_Japan01s3.jpg',
    intro:'Chiudiamo la giornata nel quartiere storico dell’intrattenimento, quando luci e lanterne cambiano completamente l’atmosfera.',
    look:['Hanamikoji-dori e le machiya','Il canale Shirakawa','Le ochaya, le case da tè tradizionali','Il teatro Minami-za vicino al fiume'],
    narration:'Gion è uno dei principali hanamachi di Kyoto, quartieri in cui si sviluppò la cultura professionale delle geiko e delle maiko. Le case da tè che vedi non sono attrazioni turistiche aperte liberamente: sono luoghi di intrattenimento tradizionale regolati da rapporti e consuetudini precise. Se incontri una maiko o una geiko, osserva con discrezione e non bloccarne il passaggio. La parte più bella della visita è spesso il semplice passaggio tra Hanamikoji e il canale Shirakawa quando si accendono le luci.',
    tip:'Non inseguire geiko o maiko e rispetta i divieti di fotografia nelle proprietà private. Dopo Gion siete già in una delle zone migliori per cena.'
  }
];

let userPos = null;
let mode = localStorage.getItem('jg-mode') || 'full';
let done = new Set(JSON.parse(localStorage.getItem('jg-done') || '[]'));
let currentStop = null;
let deferredPrompt = null;\nlet voicePc = null;\nlet voiceDc = null;\nlet voiceAudio = null;\nlet voiceState = 'idle';\nlet voiceGeneration = 0;\n\nconst timeline = document.querySelector('#timeline');
const detail = document.querySelector('#detailDialog');
const installBtn = document.querySelector('#installBtn');

function render(){
  timeline.innerHTML='';
  const visible = stops.filter(s => mode === 'full' || s.priority === 'MUST');
  visible.forEach((s,i)=>{
    const el=document.createElement('article');
    el.className='stop'+(done.has(s.id)?' done':'');
    el.innerHTML=`<img src="${s.image}" alt="${s.title}"><div class="stop__body"><div class="stop__top"><span class="badge ${s.priority==='EXTRA'?'extra':''}">${s.priority}</span><span>${done.has(s.id)?'✓':''}</span></div><h3>${s.time} · ${s.title}</h3><p>${s.subtitle}</p><div class="stop__meta"><span>⏱ ${s.duration}</span><span>${i===0?'Inizio giornata':'Apri tappa'}</span></div></div><button class="stop__tap" aria-label="Apri ${s.title}"></button>`;
    el.querySelector('button').onclick=()=>openStop(s.id);
    timeline.appendChild(el);
  });
  const count = stops.filter(s=>done.has(s.id)).length;
  document.querySelector('#progressText').textContent=`${count}/${stops.length}`;
  document.querySelector('#reduceBtn').textContent=mode==='must'?'🟢 Ripristina extra':'😮‍💨 Riduci giornata';
}

function openStop(id){\n  if(voiceState!=='idle') cleanupVoice();
  const s=stops.find(x=>x.id===id); currentStop=s;
  document.querySelector('#detailImage').src=s.image;
  document.querySelector('#detailImage').alt=s.title;
  document.querySelector('#detailPriority').textContent=s.priority;
  document.querySelector('#detailDuration').textContent=`⏱ ${s.duration}`;
  document.querySelector('#detailTitle').textContent=s.title;
  document.querySelector('#detailIntro').textContent=s.intro;
  document.querySelector('#detailNarration').textContent=s.narration;
  document.querySelector('#detailTip').textContent=s.tip;
  document.querySelector('#detailLook').innerHTML=s.look.map(x=>`<li>${x}</li>`).join('');
  document.querySelector('#doneBtn').textContent=done.has(s.id)?'↩ Segna come non visitato':'✓ Segna come visitato';
  detail.showModal();
}

function routeToCurrent(){
  if(!currentStop) return;
  const dest=`${currentStop.lat},${currentStop.lon}`;
  const origin=userPos?`&origin=${userPos.lat},${userPos.lon}`:'';
  window.open(`https://www.google.com/maps/dir/?api=1${origin}&destination=${dest}&travelmode=walking`,'_blank');
}

function setSpeakButton(label='🔊 Ascolta'){\n  const btn=document.querySelector('#speakBtn');\n  if(btn) btn.textContent=label;\n}\n\nfunction cleanupVoice(){\n  voiceGeneration++;\n  voiceState='idle';\n  try{ voiceDc?.close(); }catch(e){}\n  try{ voicePc?.getReceivers()?.forEach(r=>r.track?.stop()); }catch(e){}\n  try{ voicePc?.close(); }catch(e){}\n  if(voiceAudio){\n    try{ voiceAudio.pause(); }catch(e){}\n    try{ voiceAudio.srcObject=null; }catch(e){}\n    try{ voiceAudio.remove(); }catch(e){}\n  }\n  voicePc=null;\n  voiceDc=null;\n  voiceAudio=null;\n  setSpeakButton();\n}\n\nasync function speak(){\n  if(!currentStop) return;\n\n  if(voiceState==='ready' && voiceAudio){\n    try{\n      await voiceAudio.play();\n      voiceState='playing';\n      setSpeakButton('⏹ Ferma');\n      return;\n    }catch(e){\n      return alert('Tocca di nuovo per avviare l’audio.');\n    }\n  }\n\n  if(voiceState!=='idle'){\n    cleanupVoice();\n    return;\n  }\n\n  const stop=currentStop;\n  const generation=++voiceGeneration;\n  voiceState='connecting';\n  setSpeakButton('✕ Annulla');\n\n  try{\n    const tokenResponse=await fetch('/api/voice-token',{\n      method:'POST',\n      headers:{'Content-Type':'application/json'},\n      body:JSON.stringify({stopId:stop.id})\n    });\n    const tokenData=await tokenResponse.json().catch(()=>({}));\n    if(!tokenResponse.ok || !tokenData.value){\n      throw new Error(tokenData.error || 'Sessione vocale non disponibile');\n    }\n    if(generation!==voiceGeneration) return;\n\n    const pc=new RTCPeerConnection();\n    voicePc=pc;\n\n    const audio=document.createElement('audio');\n    audio.autoplay=true;\n    audio.playsInline=true;\n    audio.setAttribute('playsinline','');\n    audio.style.display='none';\n    document.body.appendChild(audio);\n    voiceAudio=audio;\n\n    pc.addTransceiver('audio',{direction:'recvonly'});\n\n    pc.ontrack=(event)=>{\n      if(generation!==voiceGeneration) return;\n      audio.srcObject=event.streams[0];\n      const playPromise=audio.play();\n      if(playPromise){\n        playPromise.then(()=>{\n          if(generation!==voiceGeneration) return;\n          voiceState='playing';\n          setSpeakButton('⏹ Ferma');\n        }).catch(()=>{\n          if(generation!==voiceGeneration) return;\n          voiceState='ready';\n          setSpeakButton('▶ Avvia audio');\n        });\n      }\n    };\n\n    const dc=pc.createDataChannel('oai-events');\n    voiceDc=dc;\n\n    dc.onopen=()=>{\n      if(generation!==voiceGeneration) return;\n      const narration=stop.title+'. '+stop.narration+' '+stop.tip;\n      dc.send(JSON.stringify({\n        type:'conversation.item.create',\n        item:{\n          type:'message',\n          role:'user',\n          content:[{\n            type:'input_text',\n            text:'Leggi ad alta voce in italiano, fedelmente e senza aggiungere nulla, questo testo:\n\n'+narration\n          }]\n        }\n      }));\n      dc.send(JSON.stringify({\n        type:'response.create',\n        response:{\n          output_modalities:['audio'],\n          instructions:'Leggi soltanto il testo fornito. Voce italiana naturale da audioguida, calda ma sobria, ritmo tranquillo e chiaro. Pronuncia con cura i nomi giapponesi. Non aggiungere introduzioni, conclusioni o commenti.'\n        }\n      }));\n    };\n\n    dc.onmessage=(event)=>{\n      let message;\n      try{ message=JSON.parse(event.data); }catch(e){ return; }\n      if(message.type==='error'){\n        console.error('Realtime error',message);\n        cleanupVoice();\n        alert('La voce AI non è riuscita ad avviarsi. Riprova.');\n        return;\n      }\n      if(message.type==='response.output_audio.done'){\n        setSpeakButton('✓ Audio completato');\n        setTimeout(()=>{\n          if(generation===voiceGeneration) cleanupVoice();\n        },5000);\n      }\n    };\n\n    dc.onerror=()=>{\n      if(generation!==voiceGeneration) return;\n      cleanupVoice();\n      alert('Errore di connessione audio. Riprova.');\n    };\n\n    const offer=await pc.createOffer();\n    await pc.setLocalDescription(offer);\n\n    const sdpResponse=await fetch('https://api.openai.com/v1/realtime/calls',{\n      method:'POST',\n      body:offer.sdp,\n      headers:{\n        Authorization:'Bearer '+tokenData.value,\n        'Content-Type':'application/sdp'\n      }\n    });\n\n    if(!sdpResponse.ok){\n      throw new Error('Connessione Realtime: '+sdpResponse.status);\n    }\n\n    await pc.setRemoteDescription({\n      type:'answer',\n      sdp:await sdpResponse.text()\n    });\n  }catch(error){\n    console.error(error);\n    if(generation===voiceGeneration){\n      cleanupVoice();\n      alert('Audio non disponibile in questo momento. Riprova tra qualche secondo.');\n    }\n  }\n}\nasync function locate(){
  const btn=document.querySelector('#gpsBtn');
  if(!navigator.geolocation) return alert('Geolocalizzazione non disponibile.');
  btn.textContent='📍 Localizzazione…';
  navigator.geolocation.getCurrentPosition(pos=>{
    userPos={lat:pos.coords.latitude,lon:pos.coords.longitude};
    btn.textContent='✓ Posizione attiva';
    updateWeather(true);
  },()=>{btn.textContent='📍 Usa la mia posizione';alert('Non riesco ad accedere alla posizione. Controlla i permessi del browser.');},{enableHighAccuracy:true,timeout:12000,maximumAge:60000});
}

async function updateWeather(useUser=false){
  const kyoto={lat:35.0116,lon:135.7681};
  const p=(useUser&&userPos)?userPos:kyoto;
  try{
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lon}&current=temperature_2m,apparent_temperature,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=1`;
    const r=await fetch(url); const w=await r.json();
    const code=w.current.weather_code;
    const labels={0:'sereno',1:'prevalentemente sereno',2:'parzialmente nuvoloso',3:'coperto',45:'nebbia',48:'nebbia',51:'pioviggine',53:'pioviggine',55:'pioviggine intensa',61:'pioggia debole',63:'pioggia',65:'pioggia intensa',71:'neve debole',73:'neve',75:'neve intensa',80:'rovesci',81:'rovesci',82:'rovesci intensi',95:'temporali'};
    document.querySelector('#weatherTitle').textContent=useUser?'Meteo dove sei':'Kyoto · meteo demo';
    document.querySelector('#weatherTemp').textContent=`${Math.round(w.current.temperature_2m)}°`;
    document.querySelector('#weatherText').textContent=`${labels[code]||'condizioni variabili'} · percepita ${Math.round(w.current.apparent_temperature)}° · pioggia max ${w.daily.precipitation_probability_max[0]??0}% · ${Math.round(w.daily.temperature_2m_min[0])}° / ${Math.round(w.daily.temperature_2m_max[0])}°`;
  }catch(e){
    document.querySelector('#weatherText').textContent='Meteo non disponibile. Riprova con connessione attiva.';
  }
}

document.querySelector('#closeDetail').onclick=()=>{cleanupVoice();detail.close()};
document.querySelector('#routeBtn').onclick=routeToCurrent;
document.querySelector('#speakBtn').onclick=speak;
document.querySelector('#doneBtn').onclick=()=>{if(!currentStop)return;if(done.has(currentStop.id))done.delete(currentStop.id);else done.add(currentStop.id);localStorage.setItem('jg-done',JSON.stringify([...done]));render();detail.close()};
document.querySelector('#gpsBtn').onclick=locate;
document.querySelector('#reduceBtn').onclick=()=>{mode=mode==='must'?'full':'must';localStorage.setItem('jg-mode',mode);render()};
document.querySelector('#resetBtn').onclick=()=>{done.clear();localStorage.removeItem('jg-done');render()};
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;localStorage.setItem('jg-mode',mode);render()});

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;installBtn.hidden=false});
installBtn.onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null;installBtn.hidden=true}else alert('Su iPhone: Condividi → Aggiungi alla schermata Home.');};

if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
render(); updateWeather(false);
