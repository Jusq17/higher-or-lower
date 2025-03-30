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
import GameView from './components/GameView'
import LeaderboardView from './components/LeaderboardView'
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
          <Route path="/game" element={<GameView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/leaderboard" element={<LeaderboardView />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
