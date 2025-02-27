import { red } from '@mui/material/colors'
import { set } from 'mongoose'
import { use } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginView = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(localStorage.getItem('username'))
    const [notification, setNotification] = useState('')

    useEffect(() => {
        const loggedInUser = localStorage.getItem('username')
        if (loggedInUser) {
            setUser(loggedInUser)
        }
    }, [])

    console.log(user)

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/login', {
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
            navigate('/game')
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
                    <h1 className="text-3xl mb-4">Login</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 p-2 m-2"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-2 m-2"
                    />
                    <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
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