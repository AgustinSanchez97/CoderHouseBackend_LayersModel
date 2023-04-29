



const passwordCheckEvent = document.querySelector("#passwordCheck")




passwordCheckEvent.addEventListener("click",(event)=>{
    event.preventDefault()
    if(document.querySelector("#password").value == "")return invalidCodeHtml()
    const code = document.querySelector("#code").value
    const data = {
        password : document.querySelector("#password").value,
        code:code
    }

    fetch(`/user/comparePassword/`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        let validPassword = data.validPassword
        if(validPassword)
        {
            const inputDiv = document.querySelector("#inputDiv")
            inputDiv.innerHTML = ""
            const finishText = document.createElement("h2")
            finishText.innerHTML = "Contraseña restaurada satisfactoriamente"
            const finishButton = document.createElement("a")
            finishButton.classList.add("btn", "btn-primary")
            finishButton.href = "/"
            finishButton.innerHTML = "Volver a la pagina Principal"

            inputDiv.append(finishText,finishButton)            
        }
        else
        {
            invalidCodeHtml()
        }
    })
})

function invalidCodeHtml()
{
    
    invalidPassword = document.querySelector("#invalidPassword")
    invalidPassword.innerHTML = "NUEVA CONTRASEÑA INVALIDA POR FAVOR REINTENTAR"
    password = document.querySelector("#password")
    password.value = ""
    password.classList.add("border","border-danger", "border-5")
}
