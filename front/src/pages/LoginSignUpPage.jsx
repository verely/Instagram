import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, signup, loginAsGuest } from '../store/actions/user.actions'
import  brand  from '../assets/img/shared/brand.svg'
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
        navigate("/")
    }

    async function onSignUp(ev = null) {
        if (ev) ev.preventDefault()
        if (credentials.userName && credentials.password && credentials.fullName){
            await signup(credentials)
            clearState()
        }
    }

    function toggleSignUp() {
        setIsSignUp(!isSignUp)
    }

    const handleGuestLogin = () => {
        loginAsGuest()
    }

    const signUpLabel = "Don't have an account?"
    const signUpActionCall = "Sign Up"
    const loginLabel = "Already have an account?"
    const loginActionCall = "Log In"

    return (
      <div className="login-page-container">
        <div className="login-page">

            <div className='brand-section'>
                <img className='brand-img' src={brand} alt="brand" />
                <span className="brand-description">Sign up to see photos and videos from your friends.</span>
            </div>
            <button className="blue-btn auth-btn" onClick={handleGuestLogin}>Continue as Guest</button>

            <div className='separation-section'>
                <div></div>
                <span className='or'>Or</span>
                <div></div>
            </div>

            <div className="login-section">
              {!isSignUp && <form className="auth-form" onSubmit={onLogin}>
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
                <button className="blue-btn auth-btn">Log in</button>
              </form>}
            </div>

            <div className="signUp-section">
                {isSignUp && <form className="auth-form" onSubmit={onSignUp}>
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
                        placeholder="User Name"
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
                    <button className="blue-btn auth-btn">Sign up</button>
                </form>}
            </div>

            <div className='auth-toggle'>
                <span className="label">{!isSignUp ? signUpLabel : loginLabel}</span>
                <span className="action-call" onClick={toggleSignUp}>
                    {!isSignUp ? signUpActionCall : loginActionCall}
                </span>
            </div>
        </div>
      </div>
    )
}
