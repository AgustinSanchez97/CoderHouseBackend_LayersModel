

//console.log(document.querySelector("#send"))

function queryChecker(query,id)
{
    if(formData.getAll("files").length >= 3) formData.delete("files")

    if(query == undefined)
    {
        missingData = document.querySelector(id)
        missingData.classList.add("border","border-danger", "border-5")
        formData.delete("files")

    }

    else
    {
        missingData = document.querySelector(id)
        missingData.classList.remove("border","border-danger", "border-5")
        formData.append("files",query)
    }

}
//let missingData = []
const formData = new FormData();

document.querySelector("#send").addEventListener("click", (eventData)=>{
    eventData.preventDefault();
    const documentInput = document.querySelector("#document").files[0]
    const adressInput = document.querySelector("#adress").files[0]
    const accountInput = document.querySelector("#account").files[0]
    

    queryChecker(documentInput,"#document")
    queryChecker(adressInput,"#adress")
    queryChecker(accountInput,"#account")

    if(formData.getAll("files").length == 0) return alert("Completa todos los campos necesarios")
    
    //console.log(formData.getAll("files"))
    else
    {
        formData
        const actionRute = document.querySelector("#formAction").value    

        fetch(actionRute,{
            method: "post",
            
            body: formData

            })
            .then(res => res.json())
            .then(data => {                
                //PARA REDIRIGIR A LA PAGINA PRINCIPAL UNA VEZ INICIADA SESION
                if(data.finishUpload)
                {
                    //PONER UNA VEZ TERMINADO TODO
                    //window.location.href = "/profile"
                }
            })
            .catch(error => console.log(error))
    }
})
