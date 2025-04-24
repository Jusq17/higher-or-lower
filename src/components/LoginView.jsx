import { red } from '@mui/material/colors'
import { set } from 'mongoose'
import { use } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const LoginView = () => {

    const { user, setUser } = useContext(UserContext)

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState('')

    useEffect(() => {
        const loggedInUser = localStorage.getItem('username')
        if (loggedInUser) {
            setUser(loggedInUser)
        }
    }, [])

    const handleLogin = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        
        const data = await response.json()
        console.log(data)

        const status = response.status

        if (status === 200) {

            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            setUser(data.username)

            setNotification('Login successful')
            navigate('/')
        }
        else if (status === 401) {
            setNotification('Login failed')
        }
        else {
            setNotification('User not found')
        }
    }

    return (
        <div className="flex flex-col justify-center items-center m-4">
            {user === undefined || user === null
                ?
                <div className="flex flex-col justify-center items-center m-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                        className="w-full max-w-sm bg-white shadow-md rounded-2xl p-8 flex flex-col gap-4"
                        >
                        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition duration-200"
                        >
                            Login
                        </button>
                    </form>
                    <p>{notification}</p>
                </div>
                :
                <div className="flex flex-col justify-center items-center m-4">
                    <h1 className="text-3xl mb-4">{user} logged in</h1>
                    <a href="/game" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go play the game</a>
                </div>

            }
        </div>
    )
}

export default LoginView;