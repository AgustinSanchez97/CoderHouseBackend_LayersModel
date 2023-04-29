
const emailInput = document.querySelector("#email")

console.log(document.querySelector("#recover"))
if(document.querySelector("#recover") != null)
{
    document.querySelector("#recover").addEventListener("click", (eventData)=>{
        eventData.preventDefault();
        if(emailInput.value == "")return alert("Completa todos los campos necesarios")
        const email = document.querySelector("#email").value
        const user = {
            email
        }
        //console.log(email)
    /*
        fetch(`/user/recoverPassword/${email}`,{
            method: "post",
            headers:{
                "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                //PARA REDIRIGIR A LA PAGINA PRINCIPAL UNA VEZ INICIADA SESION
                window.location.href = "/"
            })
            .catch(error => console.log(error))
            */
           window.location.href = `/user/recoverPassword/${email}`
        })

}


/*
    fetch("/user/recoverPassword",{
        method: "post",
        headers:{
            "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            //PARA REDIRIGIR A LA PAGINA PRINCIPAL UNA VEZ INICIADA SESION
            //window.location.href = "/"
        })
        .catch(error => console.log(error))
    })
*/


    /*
    document.querySelector("#recover").addEventListener("click", (eventData)=>{
        eventData.preventDefault();
        
        const user = {
            email: document.querySelector("#email").value       
        }
        console.log(user)
        fetch("/session/recoverPassword",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                //PARA REDIRIGIR A LA PAGINA PRINCIPAL UNA VEZ INICIADA SESION
                //window.location.href = "/"
            })
            .catch(error => console.log(error))
        })
    
    */
