import { useState, useEffect } from 'react'
import axios from 'axios';
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterView = () => {

    const { user, setUser } = useContext(UserContext)

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const score = 0

    const handleRegister = () => {
        
        console.log('registering')

        if (password === confirmPassword && password.length > 0 && username.length > 0) {
            axios.post('http://localhost:3000/api/register', {
                username,
                password,
                score
            }).then(res => {
                console.log(res)
                navigate('/login')
            }).catch(err => {
                console.log(err)
            })
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
                            handleRegister();
                        }}
                        className="w-full max-w-sm bg-white shadow-md rounded-2xl p-8 flex flex-col gap-4"
                        >
                        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

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
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition duration-200"
                        >
                            Register
                        </button>
                    </form>
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

export default RegisterView;