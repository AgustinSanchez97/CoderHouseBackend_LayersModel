



document.querySelector("#login").addEventListener("click", (eventData)=>{
    eventData.preventDefault();
    
    const user = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    fetch("/session/login",{
        method: "post",
        headers:{
            "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        
        .then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.setItem("token",data.token)
            //PARA REDIRIGIR A LA PAGINA PRINCIPAL UNA VEZ INICIADA SESION
            //window.location.href = "/"
        })
        .catch(error => console.log(error))
    })


document.querySelector("#currentCookie").addEventListener("click", (eventData)=>{
    eventData.preventDefault();


    fetch("/session/current",{
        method: "get",
        headers:{
            "Content-Type": "application/json"
            }
        })
        
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.log("No se encontro la Cookie "+error))

    })
