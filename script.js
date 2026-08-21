
const convertButton = document.querySelector(".convert-button")
// ✅ MUDADO: Adicionada nova constante para pegar o select "converter de"
const currencySelectFrom = document.querySelector(".currency-from")
const currencySelectTo = document.querySelector(".currency-select")

// ✅ MUDADO: Adicionado objeto com taxas de câmbio para converter entre qualquer moeda
// Taxas de câmbio em relação ao Real (BRL)
const exchangeRates = {
    real: 1.0,
    dolar: 5.2,
    euro: 6.2,
    libra: 7.7,
    bitcoin: 327.08
}

// ✅ MUDADO: Adicionado objeto com informações das moedas (nome, imagem, código)
// Informações das moedas
const currencyInfo = {
    real: { name: "Real Brasileiro", img: "./assets/real.png", code: "BRL" },
    dolar: { name: "Dólar americano", img: "./assets/logo4.png", code: "USD" },
    euro: { name: "Euro", img: "./assets/log3.png", code: "EUR" },
    libra: { name: "Libra", img: "./assets/libra 1.png", code: "GBP" },
    bitcoin: { name: "Bitcoin", img: "./assets/bitcoin 1.png", code: "BTC" }
}

// ✅ MUDADO: Função completamente reescrita para converter entre qualquer moeda
function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueConverted = document.querySelector(".currency-value")

    // Pega as moedas selecionadas
    const fromCurrency = currencySelectFrom.value
    const toCurrency = currencySelectTo.value

    // Converte para Real primeiro, depois para a moeda de destino
    const valueInReal = inputCurrencyValue * exchangeRates[fromCurrency]
    const convertedValue = valueInReal / exchangeRates[toCurrency]

    // Formata e exibe os valores
    const locales = {
        real: "pt-BR",
        dolar: "en-US",
        euro: "de-DE",
        libra: "en-GB",
        bitcoin: "pt-BR",
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat(locales[fromCurrency], {
        style: "currency",
        currency: currencyInfo[fromCurrency].code
    }).format(inputCurrencyValue)

    currencyValueConverted.innerHTML = new Intl.NumberFormat(locales[toCurrency], {
        style: "currency",
        currency: currencyInfo[toCurrency].code
    }).format(convertedValue)
}

// ✅ MUDADO: Função expandida para atualizar AMBAS as moedas (origem e destino)
// ❌ REMOVIDO: Os vários if statements que verificavam cada moeda individualmente
function changeCurrency() {
    const currencyNameFrom = document.getElementById("currency-name-from")
    const currencyImgFrom = document.querySelector(".currency-img-from")
    const currencyName = document.getElementById("currency-name")
    const currencyImg = document.querySelector(".currency-img")
    const fromCurrency = currencySelectFrom.value
    const toCurrency = currencySelectTo.value

    currencyNameFrom.innerHTML = currencyInfo[fromCurrency].name
    currencyImgFrom.src = currencyInfo[fromCurrency].img

    currencyName.innerHTML = currencyInfo[toCurrency].name
    currencyImg.src = currencyInfo[toCurrency].img
    
    convertValues()
}

// ✅ MUDADO: Adicionado novo event listener para a moeda de origem
// ✅ MUDADO: Ambos os selects agora chamam "changeCurrency" para atualizar tudo automaticamente
currencySelectTo.addEventListener("change", changeCurrency)
currencySelectFrom.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)

