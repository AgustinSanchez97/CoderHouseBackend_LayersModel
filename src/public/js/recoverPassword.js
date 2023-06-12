
const emailInput = document.querySelector("#email")

console.log(document.querySelector("#recover"))
if(document.querySelector("#recover") != null)
{
    document.querySelector("#recover").addEventListener("click", (eventData)=>{
        eventData.preventDefault();
        if(emailInput.value == "")return alert("Completa todos los campos necesarios")
        
        const email = document.querySelector("#email").value        
        window.location.href = `/api/users/recoverPassword/${email}`
    })
}
