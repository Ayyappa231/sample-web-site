function goTo(path){window.location.href=path}
function spawnHeart(){
 const h=document.createElement("span");h.className="heart";
 h.textContent=["♥","♡","💕","💗"][Math.floor(Math.random()*4)];
 h.style.left=Math.random()*100+"%";
 h.style.fontSize=(12+Math.random()*20)+"px";
 h.style.animationDuration=(7+Math.random()*8)+"s";
 document.getElementById("hearts").appendChild(h);
 setTimeout(()=>h.remove(),16000);
}
setInterval(spawnHeart,650);
for(let i=0;i<10;i++)setTimeout(spawnHeart,i*300);
function spawnBurst(n=12){for(let i=0;i<n;i++)setTimeout(spawnHeart,i*70)}