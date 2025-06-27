const convertButton = document.querySelector(".button-convert")
const currencyTo = document.querySelector(".currency-to")

const toChangeCurrency = () => {
    const imageCurrencyTo = document.querySelector(".currency-to-image")

    switch (currencyTo.value) {
        case "USD":
            imageCurrencyTo.src = "./img/USD.png"
            break;
        case "EUR":
            imageCurrencyTo.src = "./img/EUR.png"
            break;
        case "GBP":
            imageCurrencyTo.src = "./img/GBP.png"
            break;
        case "BTC":
            imageCurrencyTo.src = "./img/BTC.png"
            break;
    }

    convertValues()
}

const convertValues = async () => {
    const inputValue = Number(document.querySelector("#value").value)
    const convertedFromValue = document.querySelector(".converted-from-value")
    const convertedToValue = document.querySelector(".converted-to-value")

    if (!inputValue) {
        alert("Digite um valor para converter");
        return;
    }

    const data = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL?token=e96cda60f736d79577916377c47b92430c42eda3463f4685ecd7a175d4c1fcb2")
    .then( response => response.json())
    .catch( error => {
        console.error("Erro na requisição.", error)
        alert("Erro ao obter taxas de câmbio. Tente novamente.")
        return
    })

    const dolarToDay = data.USDBRL.ask
    const euroToDay = data.EURBRL.ask
    const libraToDay = data.GBPBRL.ask
    const bitcoinToDay = data.BTCBRL.ask

    switch (currencyTo.value) {
    case "USD":
        convertedToValue.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputValue / dolarToDay)
        break
    case "EUR":
        convertedToValue.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputValue / euroToDay)
        break
    case "GBP":
        convertedToValue.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputValue / libraToDay)
        break
    case "BTC":
        convertedToValue.innerHTML = (inputValue / bitcoinToDay).toFixed(8) + " BTC"
        break
}

    convertedFromValue.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputValue)
}

convertButton.addEventListener("click", convertValues)
currencyTo.addEventListener("change", toChangeCurrency)