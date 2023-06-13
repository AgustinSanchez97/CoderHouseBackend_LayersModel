
const textBox = document.querySelector("#textBox")

let chatbox = document.querySelector("#chatInput")

const chatId = document.querySelector("#chatId").value

const userName = document.querySelector("#userName").value

const sendButton = document.querySelector("#sendButton")

//PARA ENVIAR MENSAJE CON CELULAR
sendButton.addEventListener("click",(event)=>{
    event.preventDefault()
    sendMessage()
})

//PARA ENVIAR MENSAJE CON TECLADO
chatbox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendMessage()
    }
})



function sendMessage()
{
    let textInput = document.querySelector("#chatInput").value        
    if(!textInput) return
    if(textInput.trim().length === 0)return 
    let data = {chatId:chatId,message:textInput,user:userName}
    chatbox.value = ""

    fetch("/api/users/chat/",{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        
        
        .then(res => res.json())
        .then(data => {            
            renderChat(data)
        })
        .catch(error => console.log(error))
}


function update()
{
    fetch(`/api/users/chat/${chatId}`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
            }            
        })                
        .then(res => res.json())
        .then(data => {

            renderChat(data)        
        })
        .catch(error => console.log(error))
}


function renderChat(data)
{
    textBox.innerHTML = ""
            data.messages.forEach(message => {                
                const chatDiv = document.createElement("div")
                chatDiv.classList.add("d-flex", "flex-row", "p-1")


                const user = document.createElement("h4")
                user.classList.add("my-0","mx-1","text-info")
                user.innerHTML= `${message.user}:`
                
                const text = document.createElement("p")
                text.classList.add("my-1","text-info")
                text.innerHTML= message.message
                
                chatDiv.append(user,text)
                textBox.append(chatDiv)
            });
}


update()
setInterval(update,2000)
    


