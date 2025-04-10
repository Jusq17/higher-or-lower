import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'

const LeaderboardView = () => {

    const [leaderboard, setLeaderboard] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/user')
                const data = await response.json()

                // Sort the leaderboard by score in descending order
                data.sort((a, b) => b.score - a.score)

                // Limit to top 10 players
                const top10 = data.slice(0, 10)

                // Set the leaderboard state
                setLeaderboard(top10)

            } catch (error) {
                console.error('Error fetching leaderboard:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchLeaderboard()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center m-2">
            <h1 className="text-4xl mb-8">Higher or Lower</h1>
            <h2 className="text-2xl italic mb-4">Leaderboard</h2>
            
            {loading && <LoadingSpinner />}
            {leaderboard.length === 0 && !loading && (
                <p className="text-xl italic m-4">No players found</p>
            )}

            {leaderboard.map((user, index) => (
                <div key={index} className="flex flex-col justify-center items-center m-2">
                    <p className="text-lg">{index + 1}. {user.username}: {user.score}</p>
                </div>
            ))}
        </div>
    )
}

export default LeaderboardView;