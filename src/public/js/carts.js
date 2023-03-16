
const deleteEvent = document.querySelectorAll(".deleteCart")

deleteEvent.forEach((cart) => {
    cart.addEventListener("click", (eventData)=>{
    eventData.preventDefault();
    const cartId = eventData.target.closest(".deleteCart").getAttribute("id")
    const data = {cartId}    
    fetch(`/api/carts/${cartId}`,{
        method: "delete",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            window.location.href = "/api/carts/"
        })

    })
})