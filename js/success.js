const selectedDate=localStorage.getItem("dateChoice");
const selectedChoice=localStorage.getItem("activityChoice");
if(selectedDate&&selectedChoice){
 const dt=new Date(selectedDate+"T00:00:00");
 document.getElementById("summary").textContent=`${dt.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric",year:"numeric"})} — ${selectedChoice}. A beautiful plan, if you ask me. 💗`;
}
function startOver(){localStorage.removeItem("dateChoice");localStorage.removeItem("activityChoice");window.location.href="index.html"}