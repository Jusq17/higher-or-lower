import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useCountries } from './hooks/useCountries'
import LoginView from './components/LoginView'
import LoadingSpinner from './components/LoadingSpinner'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const View = () => {

  const [points, setPoints] = useState(0)
  const [playing, setPlaying] = useState(true)

  const { data, isError, isPending } = useCountries(points)

  const checkAnswer = (answer) => {
    // check if the answer is correct
    // if it is, increment the points
    // if it is not, reset the points to 0

    // get the population of the two countries
    const population1 = data.relevantData[0].population
    const population2 = data.relevantData[1].population

    if (answer === 'higher') {
      if (population1 > population2) {
        setPoints(points + 1)
      } else {
        setPlaying(false)
      }
    }

    if (answer === 'lower') {
      if (population1 < population2) {
        setPoints(points + 1)
      } else {
        setPlaying(false)
      }
    }
  }

  const startGame = () => {
    setPoints(0)
    setPlaying(true)
  }

  console.log(data)

  return (
    <div>
      <div className="flex flex-col justify-center items-center m-4">
        <h1 className="text-3xl font-bold m-4">Higher or Lower</h1>
        <p className="text-2xl m-4">Points: {points}</p>
      </div>

      {isError && <div className="flex flex-col justify-center items-center m-4">Error fetching data</div>}
      {isPending && <LoadingSpinner />}
      {data && playing
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
        : null
      }
      
      {!playing
        ?
        <div className="flex flex-col justify-center items-center m-4">
          <h2 className="text-2xl">Game Over</h2>
          <p className="text-xl">You scored {points} points</p>
          <button onClick={startGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Play Again</button>
        </div>
        : null
      }
    </div>
  )
}

export default App
