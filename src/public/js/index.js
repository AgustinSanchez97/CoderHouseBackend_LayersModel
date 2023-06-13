const userRole = document.querySelector("#userRole").value
const userEmail = document.querySelector("#userEmail").value

const specialProducts = document.querySelectorAll(".specialProduct")

const purchaseLimitations = document.querySelectorAll(".purchaseLimitation")



if(userRole == "admin")
{
    specialProducts.forEach(element => {
        element.style.display = "inline-block"
    });
}

else if(userRole == "premium")
{
    specialProducts.forEach(element => {
        if(element.getAttribute("data-id") == userEmail) element.style.display = "inline-block"
    });
    purchaseLimitations.forEach(element => {
        if(element.getAttribute("data-id") == userEmail) element.style.display = "none"
    });

}
const adminProductsInterface = document.querySelectorAll(".createProductInterface")

adminProductsInterface.forEach(element => {
    if(element.getAttribute("data-id") == "admin" ||element.getAttribute("data-id") == "premium") element.style.display = "inline-block"
});


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
    window.location.href = `/?category=${actualCategory.value}&&sortMethod=${orderSelectedEvent.value}`
})





    


