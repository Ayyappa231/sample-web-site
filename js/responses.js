async function loadResponses(){
    const status=document.getElementById("status");
    const container=document.getElementById("tableContainer");
    const key=document.getElementById("adminKey").value.trim();

    if(!key){
        status.textContent="Please enter your admin key.";
        return;
    }

    if(!RESPONSE_API_URL || RESPONSE_API_URL.includes("PASTE_YOUR_")){
        status.textContent="Response system is not configured yet.";
        return;
    }

    status.textContent="Loading responses…";
    container.innerHTML="";

    try{
        const response=await fetch(
            RESPONSE_API_URL+"?action=list&key="+encodeURIComponent(key),
            {cache:"no-store"}
        );

        const data=await response.json();

        if(!data.ok){
            status.textContent=data.error || "Unable to load responses.";
            return;
        }

        const rows=data.rows || [];

        if(!rows.length){
            status.textContent="No responses yet.";
            return;
        }

        status.textContent=`${rows.length} response${rows.length===1?"":"s"} found.`;

        let html=`<table class="response-table">
        <thead><tr><th>#</th><th>Date</th><th>Activity</th><th>Submitted</th></tr></thead><tbody>`;

        rows.forEach((row,i)=>{
            html+=`<tr><td>${i+1}</td>
            <td>${escapeHtml(row.date)}</td>
            <td>${escapeHtml(row.activity)}</td>
            <td>${escapeHtml(row.submittedAt)}</td></tr>`;
        });

        html+="</tbody></table>";
        container.innerHTML=html;

    }catch(error){
        console.error(error);
        status.textContent="Could not connect to the response service.";
    }
}

function escapeHtml(value){
    return String(value ?? "")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}