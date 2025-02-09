import { useState, useEffect } from 'react'

const LoginView = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="flex flex-col justify-center items-center m-4">
            <h1 className="text-3xl">Login</h1>
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
            </button>
        </div>
    )
}

export default LoginView;