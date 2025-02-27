import { useState, useEffect } from "react";

const ProfileView = () => {

    const [username, setUsername] = useState('')
    const [highscore, setHighscore] = useState('')

    useEffect(() => {

        const getUser = async () => {
            const token = localStorage.getItem('token')
    
            const response = await fetch('http://localhost:3000/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
    
            const data = await response.json()
            console.log(data)

            setUsername(data.username)
            setHighscore(data.score)
        }
        getUser()
    }, [])


    return (
        <div className="flex flex-col justify-center items-center m-4">
            <h1 className="text-4xl font-bold">Profile</h1>
            <div className="flex flex-col justify-center items-center m-4">
                <h2 className="text-2xl font-bold">Username: {username}</h2>
                <h2 className="text-2xl font-bold">Highscore: {highscore}</h2>
            </div>
        </div>
    )
}

export default ProfileView;