import React, { useState, useEffect } from 'react';

const StartingView = () => {

    const [user, setUser] = useState(localStorage.getItem('username'))

    useEffect(() => {
        const loggedInUser = localStorage.getItem('username')
        if (loggedInUser) {
            setUser(loggedInUser)
        }
    }, [])

    return (
        <div className="flex flex-col justify-center items-center m-2">
            <h1 className="text-4xl mb-8">Higher or Lower</h1>
            <h2 className="text-2xl italic">Countries edition</h2>
            <div className="flex flex-col justify-center items-center m-4">
                <p className="text-2xl">How to play:</p>
                <p>Two countries will be shown on the screen.</p>
                <p>Guess which country has a higher population.</p>
            </div>
            {user === undefined || user === null
            ?
            <div className="flex flex-col justify-center items-center m-4">
                <a href="/game" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Play as guest
                </a>
                <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Log in
                </a>
            </div>
            :
            <div className="flex flex-col justify-center items-center m-4">
                <a href="/game" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Play
                </a>
            </div>
            }
        </div>
    );
}

export default StartingView;