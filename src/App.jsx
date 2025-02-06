import { useState, useEffect } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <View />
    </QueryClientProvider>
  )
}

const View = () => {

  const [points, setPoints] = useState(0)

  const checkAnswer = (answer) => {
    // check if the answer is correct
    // if it is, increment the points
    // if it is not, reset the points to 0

    // get the population of the two countries
    const population1 = data.relevantData[0].population
    const population2 = data.relevantData[1].population

    if (answer === 'higher') {
      return population1 > population2 ? setPoints(points + 1) : setPoints(0)
    }

    if (answer === 'lower') {
      return population1 < population2 ? setPoints(points + 1) : setPoints(0)
    }
  }

  const { isPending, isError, data } = useQuery({
    queryKey: ['countryPair', points],
    queryFn: async () => {
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
    },
    refetchOnWindowFocus: false,
  },
)

  console.log(data)

  return (
    <div>
      <div className="flex flex-col justify-center items-center m-4">
        <h1 className="text-3xl font-bold underline">Higher or Lower</h1>
        <p className="text-2xl ml-4">Points: {points}</p>
      </div>

      {isError && <div>Error fetching data</div>}
      {isPending && <div>Loading...</div>}
      {data 
        ? 
        <div>
          <div className="flex flex-col justify-center items-center m-4">
            <h2 className="text-2xl mb-4">{data.relevantData[0].name}</h2>
            <img className="max-w-md" src={data.relevantData[0]?.flags?.png} alt={`${data.relevantData[0]?.name} flag`} />
            <p className='m-4'>Population: {data.relevantData[0]?.population}</p>
            <div>
              <button onClick={() => checkAnswer("higher")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Higher</button>
              <button onClick={() => checkAnswer("lower")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Lower</button>
            </div>
          </div>

          <h2 className="flex justify-center m-4">vs</h2>

          <div className="flex flex-col justify-center items-center m-4">
            <h2 className="text-2xl mb-4">{data.relevantData[1].name}</h2>
            <img className="max-w-md" src={data.relevantData[1]?.flags?.png} alt={`${data.relevantData[1]?.name} flag`} />
            <p className='m-4'>Population: {data.relevantData[1]?.population}</p>
          </div>
        </div>
        : <div>No data</div>
      }
    </div>
  )
}

export default App
