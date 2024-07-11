import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, signup } from '../store/actions/user.actions'

export function LoginSignUpPage() {
    const [credentials, setCredentials] = useState({ userName: '', password: '', fullName: '' })
    const [isSignUp, setIsSignUp] = useState(false)

    const navigate = useNavigate()


    function clearState() {
        setCredentials({ userName: '', password: '', fullName: '', imgUrl: '' })
        setIsSignUp(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.userName) return

        await login(credentials)

        clearState()
        console.log("Try to navigate")
        navigate("/")
        console.log("onLogin end")
    }

    async function onSignUp(ev = null) {
        if (ev) ev.preventDefault()
        if (credentials.userName && credentials.password && credentials.fullName){
            await signup(credentials)
            clearState()
        }
        console.log("SignUp end")
    }

    function toggleSignUp() {
        setIsSignUp(!isSignUp)
    }

    const signUpLabel = "Don't have an account? Sign Up"
    const loginLabel = "Already have an account? Log In"

    return (

        <div className="login-page">
            <p>
                <button >Continue as Guest</button>
            </p>
            <span>OR</span>

            {!isSignUp && <form className="login-form" onSubmit={onLogin}>
                <input
                        type="text"
                        name="userName"
                        value={credentials.userName}
                        placeholder="UserName"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                <button>Log in</button>
            </form>}
            <div className="signUp-section">
                {isSignUp && <form className="signUp-form" onSubmit={onSignUp}>
                    <input
                        type="text"
                        name="fullName"
                        value={credentials.fullName}
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="userName"
                        value={credentials.userName}
                        placeholder="UserName"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <button >Sign up</button>
                </form>}

            </div>

            <p>
                <button className="btn-link" onClick={toggleSignUp}>{!isSignUp ? signUpLabel : loginLabel}</button>
            </p>
        </div>
    )
}
