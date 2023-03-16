const actualCategory = document.querySelector("#actualCategory")
const categorySelectedEvent = document.querySelector("#allCategory")

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





    


