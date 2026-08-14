let audioCtx=null,playing=false,timer=null;
function toggleMusic(){
 const btn=document.getElementById("musicBtn");
 if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();
 if(playing){clearInterval(timer);playing=false;btn.textContent="♫";return}
 playing=true;btn.textContent="🔊";
 const notes=[261.63,329.63,392,329.63,293.66,349.23,440,349.23];
 function playNote(freq,t){
  const o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type="sine";o.frequency.value=freq;
  g.gain.setValueAtTime(.0001,t);
  g.gain.exponentialRampToValueAtTime(.035,t+.03);
  g.gain.exponentialRampToValueAtTime(.0001,t+.7);
  o.connect(g).connect(audioCtx.destination);o.start(t);o.stop(t+.75);
 }
 function melody(){notes.forEach((n,i)=>playNote(n,audioCtx.currentTime+i*.42))}
 melody(); timer=setInterval(melody,notes.length*.42*1000);
}