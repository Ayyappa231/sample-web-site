let selectedDate="",viewDate=new Date();
const today=new Date();today.setHours(0,0,0,0);
function formatISO(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function renderCalendar(){
 const y=viewDate.getFullYear(),m=viewDate.getMonth();
 document.getElementById("monthTitle").textContent=new Intl.DateTimeFormat(undefined,{month:"long",year:"numeric"}).format(viewDate);
 const first=new Date(y,m,1).getDay(),last=new Date(y,m+1,0).getDate(),prevLast=new Date(y,m,0).getDate();
 let cells="";
 for(let i=first-1;i>=0;i--)cells+=`<div class="day muted">${prevLast-i}</div>`;
 for(let d=1;d<=last;d++){
  const dt=new Date(y,m,d);let cls="day";
  if(dt.getTime()===today.getTime())cls+=" today";
  if(selectedDate===formatISO(dt))cls+=" selected";
  cells+=`<div class="${cls}" onclick="pickDate(${y},${m},${d})">${d}</div>`;
 }
 const total=Math.ceil((first+last)/7)*7;
 for(let d=1;d<=total-first-last;d++)cells+=`<div class="day muted">${d}</div>`;
 document.getElementById("days").innerHTML=cells;
}
function changeMonth(n){viewDate.setMonth(viewDate.getMonth()+n);renderCalendar()}
function pickDate(y,m,d){
 const dt=new Date(y,m,d);if(dt<today)return;
 selectedDate=formatISO(dt);renderCalendar();
 document.getElementById("dateHint").textContent="♡ "+dt.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric",year:"numeric"});
 localStorage.setItem("dateChoice",selectedDate);
}
function submitDate(){
 if(!selectedDate){document.getElementById("dateHint").textContent="Please choose a date first, lovely. ♡";return}
 window.location.href="activity.html";
}
renderCalendar();