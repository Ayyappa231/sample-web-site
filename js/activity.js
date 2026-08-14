let selectedChoice="";
function selectChoice(el){
 document.querySelectorAll(".choice").forEach(x=>x.classList.remove("selected"));
 el.classList.add("selected");selectedChoice=el.dataset.choice;
 document.getElementById("choiceHint").textContent=`${selectedChoice} it is. Excellent choice. 💕`;
}
function submitChoice(){
 if(!selectedChoice){document.getElementById("choiceHint").textContent="Choose one little adventure first ♡";return}
 localStorage.setItem("activityChoice",selectedChoice);
 window.location.href="success.html";
}