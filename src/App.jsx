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
import StartingView from './components/StartingView'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'
import ProfileView from './components/ProfileView'
import NavBar from './components/NavBar'
import LoadingSpinner from './components/LoadingSpinner'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<StartingView />} />
          <Route path="/game" element={<View />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/profile" element={<ProfileView />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const View = () => {

  const [points, setPoints] = useState(0)
  const [playing, setPlaying] = useState(true)

  const { data, isError, isPending, isFetching, refetch } = useCountries()

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
        refetch()
      } else {
        updateScore()
        setPlaying(false)
        refetch()
      }
    }

    if (answer === 'lower') {
      if (population1 < population2) {
        setPoints(points + 1)
        refetch()
      } else {
        updateScore()
        setPlaying(false)
        refetch()
      }
    }
  }

  const startGame = () => {
    // reset the points to 0 and set playing to true
    // no refetch needed because the data is already fetched for the next game
    // when the playing state is set to false

    setPoints(0)
    setPlaying(true)
  }

  const token = localStorage.getItem('token')

  const updateScore = async () => {
    const response = await fetch('http://localhost:3000/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        score: points
      })
    })

    const data = await response.json()

    console.log(response)
  }

  console.log(data)

  return (
    <div>
      <div className="flex flex-col justify-center items-center m-4">
        <p className="text-xl italic m-4">Category: population</p>
        <p className="text-2xl mt-4">Points: {points}</p>
      </div>

      {isError && <div className="flex flex-col justify-center items-center m-4">Error fetching data</div>}
      {isFetching && playing && <LoadingSpinner />}
      {data && playing && !isFetching && !isError
        ? 
        <div>
          <div className="flex flex-col justify-center items-center m-4">
            <h2 className="text-2xl mb-4">{data.relevantData[0].name}</h2>
            {data.relevantData[0]?.flags?.png ? (
              <img className="border-2 border-solid max-w-md" src={data.relevantData[0]?.flags?.png} alt={`${data.relevantData[0]?.name} flag`} />
            ) : (
              <LoadingSpinner />
            )}
            <div className='mt-4'>
              <button onClick={() => checkAnswer("higher")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1">Higher</button>
              <button onClick={() => checkAnswer("lower")} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mx-1">Lower</button>
            </div>
          </div>

          <h2 className="text-xl italic flex justify-center m-4">vs</h2>

          <div className="flex flex-col justify-center items-center m-4">
            <h2 className="text-2xl mb-4">{data.relevantData[1].name}</h2>
            {data.relevantData[1]?.flags?.png ? (
              <img className="border-2 border-solid max-w-md" src={data.relevantData[1]?.flags?.png} alt={`${data.relevantData[1]?.name} flag`} />
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
        : null
      }
      
      {!playing
        ?
        <div className="flex flex-col justify-center items-center m-4">
          <h2 className="text-2xl">Game Over</h2>
          <p className="text-xl">You scored {points} points</p>
          <button onClick={startGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Play Again</button>
        </div>
        : null
      }
    </div>
  )
}

export default App
