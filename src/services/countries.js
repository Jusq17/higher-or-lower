import axios from "axios"

const getCountryPair = async () => {

    // get all countries
    const response = await axios.get("https://restcountries.com/v3.1/all?fields=name")

    console.log(response.data)

    const countries = response.data

    // get two random countries
    let randomIndex1 = Math.floor(Math.random() * countries.length)
    let randomIndex2 = Math.floor(Math.random() * countries.length)

    while (randomIndex1 === randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * countries.length)
    }

    const country1 = countries[randomIndex1].name.common
    const country2 = countries[randomIndex2].name.common

    return { country1, country2 }
}

const getCountryInfo = async (country) => {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`)
    return response.data[0]
}

export default { getCountryPair, getCountryInfo }