const actualCategory = document.querySelector("#actualCategory")
const categorySelectedEvent = document.querySelector("#allCategory")

//const adminProductsInterface = document.querySelector("#adminProducts")
//if(adminProductsInterface.getAttribute("class") == "admin") adminProductsInterface.style.display = "block"

const adminProductsInterface = document.querySelectorAll(".adminProducts")
console.log(adminProductsInterface.length) 

adminProductsInterface.forEach(element => {
    console.log(element.getAttribute("data-id")) 
    
    if(element.getAttribute("data-id") == "admin") element.style.display = "inline-block"
});

//if(adminProductsInterface.getAttribute("class") == "admin") adminProductsInterface.style.display = "block"



categorySelectedEvent.addEventListener("change",(event)=>
{
    event.preventDefault()
    //PROBAR DE SACAR EL IF
    if(categorySelectedEvent.value == "todos") return window.location.href = `/`
    window.location.href = `/?category=${categorySelectedEvent.value}&&sortMethod=${orderSelectedEvent.value}`
})

const actualOrder = document.querySelector("#actualSort")
const orderSelectedEvent = document.querySelector("#allSort")

orderSelectedEvent.addEventListener("change",(event)=>
{
    event.preventDefault()
    console.log(orderSelectedEvent.value)
    //if(orderSelectedEvent.value == "todos") return window.location.href = `/`
    window.location.href = `/?category=${actualCategory.value}&&sortMethod=${orderSelectedEvent.value}`
})





    


