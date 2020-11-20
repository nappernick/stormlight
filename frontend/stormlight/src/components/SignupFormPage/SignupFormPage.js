import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from "../../store/session"
import { Redirect } from 'react-router-dom'

function SignupFormPage() {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) return <Redirect to="/" />

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("got here")
        if (password === confirmPassword) {
            setErrors([])
            dispatch(sessionActions.signup(
                { username, password, email }
            ))
                .catch((res) => { if (res.data && res.data.errors) setErrors(res.data.errors) })
        }

        return setErrors(["Check your passwords! They don't currently match."])
    }
    return (
        <>
            <div>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        value={email}
                        name='email'
                        placeholder='email@email.com'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        value={username}
                        name='username'
                        placeholder='dontuserthisname'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="text"
                        value={password}
                        name='password'
                        placeholder='A strong password (min 6 characters)'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input
                        type="text"
                        value={confirmPassword}
                        name='confirmPassword'
                        placeholder='Same password as above. Again.'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
        </>
    )
}

export default SignupFormPage
