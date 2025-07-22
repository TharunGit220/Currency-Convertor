const BASE_URL = "https://hexarate.paikama.co/api/rates/latest/INR?target=GBP"

const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const message = document.querySelector(".msg")

for(let select of dropdown){
    for(currencycodes in countryList){

        let newoption = document.createElement("option");
        newoption.innerText = currencycodes
        newoption.value = currencycodes
        select.append(newoption)
        if(select.name == "from" && currencycodes == "USD"){
            newoption.selected = "selected";
        }
        else if(select.name == "to" && currencycodes == "INR"){
            newoption.selected = "selected"
        }
    }
    select.addEventListener("change", (evt) =>{
        updateflag(evt.target)
    }) 
}

const updateflag = (element) =>{
    let img = element.parentElement.querySelector("img")
    img.src = `https://flagsapi.com/${countryList[element.value]}/shiny/64.png`  
}

button.addEventListener("click", (evt) =>{
    evt.preventDefault()
    updateExchangeRate()
})
const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input")
    if(amount.value == "" || amount.value < 1){
        amount.value=1
    }
    console.log(fromcurr.value)
    console.log(tocurr.value)
    const URL = `https://hexarate.paikama.co/api/rates/latest/${fromcurr.value}?target=${tocurr.value}`
    let response = await fetch(URL)
    let info = await response.json()
    let rate = info.data.mid
    let finalamount =  amount.value * rate 
    message.innerText = `${amount.value} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
}
window.addEventListener("load",()=>{
    updateExchangeRate()
})