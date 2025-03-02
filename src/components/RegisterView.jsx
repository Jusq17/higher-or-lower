import { useState, useEffect } from 'react'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const RegisterView = () => {

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
            <h1 className="text-3xl">Register</h1>
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 p-2 m-2"
            />
            <button
                onClick={handleRegister} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Register
            </button>
        </div>
    )
}

export default RegisterView;