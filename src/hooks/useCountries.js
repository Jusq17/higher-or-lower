import { useQuery } from "@tanstack/react-query";

const fetchCountries = async () => {
  // a function that gets the relevant data for two random countries

  const response = await fetch('https://restcountries.com/v3.1/all?fields=name')

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const countries = await response.json()

  let randomIndex1 = Math.floor(Math.random() * countries.length)
  let randomIndex2 = Math.floor(Math.random() * countries.length)

  while (randomIndex1 === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * countries.length)
  }

  const country1 = countries[randomIndex1].name.common
  const country2 = countries[randomIndex2].name.common

  // make a request to get the info for the two countries
  const countryInfoResponse = await Promise.all([
    fetch(`https://restcountries.com/v3.1/name/${country1}`),
    fetch(`https://restcountries.com/v3.1/name/${country2}`)
  ])

  // Check if all responses are OK
  countryInfoResponse.forEach(response => {
    if (!response.ok) throw new Error("Failed to fetch country data")
  })

  // get the data from the responses
  const countryInfo = await Promise.all(countryInfoResponse.map(res => res.json()))

  // get the relevent data from the responses, the name, flag, population and area
  const relevantData = countryInfo.map(info => {
    return {
      name: info[0].name.common,
      flags: info[0].flags,
      population: info[0].population,
      area: info[0].area
    }
  })

  return { relevantData }
}

export const useCountries = (points) => {
  return useQuery({
    queryKey: ['countryPair', points],
    queryFn: fetchCountries,
    refetchOnWindowFocus: false,
  })
}