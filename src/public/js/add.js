
const selectCardId = document.querySelector("#listOfCarts")
const productId = document.querySelector("#productId").value

const productQuantity = document.querySelector("#productQuantity")

const sendEvent = document.querySelector("#send")

selectCardId.addEventListener("change",(event)=>
{
    event.preventDefault()
    //productQuantity.value =

})



sendEvent.addEventListener("click",(event)=>{
    
    event.preventDefault()
    //console.log(selectCardId.value == "",productQuantity.value == "")
    if(selectCardId.value == "" || productQuantity.value == "") return

    
    const cartId = selectCardId.value

    const data = {
        _productId:productId,
        product:[               
            quantity= productQuantity.value
        ],
    }    
    /*
    product:[                
                    _productId= productId,
                    quantity= productQuantity.value
            ],
    */

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
        //window.location.href = "/api/carts/"
    })
})

