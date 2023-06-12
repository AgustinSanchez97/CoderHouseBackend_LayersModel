
const selectEvent = document.querySelectorAll(".selectRole")
const deleteEvent = document.querySelectorAll(".deleteUser")

const sessionUserEmail = document.querySelector("#userEmail").value
const allUserData = document.querySelectorAll(".userData")

const deleteOldUsers = document.querySelector("#deleteOldUsers")



allUserData.forEach(element => {    
    if(element.id == sessionUserEmail)element.remove()
})

selectEvent.forEach((user) => {
    user.addEventListener("click", (eventData)=>{
    eventData.preventDefault();
    const userId = eventData.target.closest(".selectRole").getAttribute("id")
    const index = eventData.target.closest(".selectRole").getAttribute("data-id")
    const roleSelected = document.querySelector(`#selectInput${index}`).value
    
    const data = {role:roleSelected}

    console.log(userId, roleSelected)
    
    fetch(`api/users/changeRole/${userId}`,{
        method: "put",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            //window.location.href = "/user"
        })
    })
})


deleteEvent.forEach((user) => {
    user.addEventListener("click", (eventData)=>{
    eventData.preventDefault();
    const userId = eventData.target.closest(".deleteUser").getAttribute("id")        
    
    fetch(`api/users/${userId}`,{
        method: "delete",
        headers:{
            "Content-Type": "application/json"
        },        
        })
        .then(res => res.json())
        .then(data => {
            window.location.href = "/user"
        })
    })
})

deleteOldUsers.addEventListener("click",(eventData)=>{
    eventData.preventDefault();

    fetch(`api/users/`,{
        method: "delete",
        headers:{
            "Content-Type": "application/json"
        },        
        })
        .then(res => res.json())
        .then(data => {
            window.location.href = "/user"
    })    
})