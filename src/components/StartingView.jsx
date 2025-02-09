
const StartingView = () => {
    return (
        <div className="flex flex-col justify-center items-center m-8">
            <h1 className="text-3xl">Higher or Lower</h1>
            <p className="italic">Countries edition</p>
            <div className="flex flex-col justify-center items-center m-4">
                <p className="text-2xl">How to play:</p>
                <p>Two countries will be shown on the screen.</p>
                <p>Guess which country has a higher population.</p>
            </div>
            <div className="flex flex-col justify-center items-center m-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Play as guest
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
            </button>
            </div>
        </div>
    );
}

export default StartingView;