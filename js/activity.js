let selectedChoice="";

function selectChoice(el){
    document.querySelectorAll(".choice").forEach(x=>x.classList.remove("selected"));
    el.classList.add("selected");
    selectedChoice=el.dataset.choice;
    document.getElementById("choiceHint").textContent =
        `${selectedChoice} it is. Excellent choice. 💕`;
}

function submitChoice(){
    const hint=document.getElementById("choiceHint");

    if(!selectedChoice){
        hint.textContent="Choose one little adventure first ♡";
        return;
    }

    if(!RESPONSE_API_URL || RESPONSE_API_URL.includes("PASTE_YOUR_")){
        hint.textContent="Response system is not configured yet.";
        return;
    }

    const dateChoice=localStorage.getItem("dateChoice");

    if(!dateChoice){
        hint.textContent="Please choose a date first ♡";
        return;
    }

    const button=document.querySelector(".primary");
    button.disabled=true;
    button.textContent="Saving our plan… 💗";

    const form=document.createElement("form");
    form.method="POST";
    form.action=RESPONSE_API_URL;
    form.target="responseSubmitFrame";
    form.style.display="none";

    const fields={
        action:"save",
        date:dateChoice,
        activity:selectedChoice,
        submittedAt:new Date().toISOString()
    };

    Object.entries(fields).forEach(([name,value])=>{
        const input=document.createElement("input");
        input.type="hidden";
        input.name=name;
        input.value=value;
        form.appendChild(input);
    });

    const iframe=document.createElement("iframe");
    iframe.name="responseSubmitFrame";
    iframe.style.display="none";

    document.body.appendChild(iframe);
    document.body.appendChild(form);
    form.submit();

    localStorage.setItem("activityChoice",selectedChoice);

    setTimeout(()=>window.location.href="success.html",1200);
}