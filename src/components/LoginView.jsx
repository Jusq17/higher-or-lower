
const LoginView = () => {

    return (
        <div className="flex flex-col justify-center items-center m-4">
            <h1 className="text-3xl">Login</h1>
            <form className="flex flex-col justify-center items-center m-4">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Login</button>
            </form>
        </div>
    )
}

export default LoginView;