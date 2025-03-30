import { useState, useEffect } from 'react'

const LeaderboardView = () => {

    const [leaderboard, setLeaderboard] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/user')
                const data = await response.json()
                setLeaderboard(data)
            } catch (error) {
                console.error('Error fetching leaderboard:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchLeaderboard()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col justify-center items-center m-2">
            <h1 className="text-4xl mb-8">Higher or Lower</h1>
            <h2 className="text-2xl italic">Leaderboard</h2>
            <div className="flex flex-col justify-center items-center m-4">
                <p className="text-2xl">Top 10 players</p>
                <p>Coming soon...</p>
            </div>
        </div>
    )
}

export default LeaderboardView;