
const selectCardId = document.querySelector("#cartId")
const productId = document.querySelector("#productId").value

const productQuantity = document.querySelector("#productQuantity")

const sendEvent = document.querySelector("#send")


productQuantity.addEventListener("change",(event)=>
{
    if (productQuantity.value < Number(productQuantity.min)) productQuantity.value = Number(productQuantity.min)
    if (productQuantity.value > Number(productQuantity.max)) productQuantity.value = Number(productQuantity.max)
})
sendEvent.addEventListener("click",(event)=>{
    
    event.preventDefault()
    if(selectCardId.value == "" || productQuantity.value == "") return
    const cartId = selectCardId.value

    const data = {
        _productId:productId,
        product:[               
            quantity= productQuantity.value
        ],
    }    

    fetch(`/api/carts/${cartId}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(data => {
        window.location.href = "/"
    })
})

