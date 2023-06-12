

const deleteCartEvent = document.querySelector("#deleteCart")
const cartId = deleteCartEvent.getAttribute("data-id")

if(deleteCartEvent.getAttribute("data-") == "admin") deleteCartEvent.style.display = "inline-block"

deleteCartEvent.addEventListener("click", (eventData)=>{
    eventData.preventDefault();

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





//DELETE CART
const deleteProductEvent = document.querySelectorAll(".deleteProductsFromCart")

    
        deleteProductEvent.forEach((product) => {        
            product.addEventListener("click", (eventData)=>{
            eventData.preventDefault();
            const productId = product.closest(".deleteProductsFromCart").getAttribute("id")
            const data = {productId}
            //console.log(productId)
            
            fetch(`/api/carts/${cartId}/products/${productId}`,{
                method: "delete",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    window.location.href = `/editCart/${cartId}/`
                })
        
            })
        })
    
