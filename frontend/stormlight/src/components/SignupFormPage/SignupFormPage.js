import React, { useEffect, useState } from 'react'
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
        if (password === confirmPassword) {
            setErrors([])
            dispatch(sessionActions.signup(e.target.value))
                .catch((res) => { if (res.data && res.data.errors) setErrors(res.data.errors) })
            return
        }
        return setErrors(["Check your passwords! They don't currently match."])
    }
    return (
        <>
            <div>
                <ul>
                    {errors.map(error => {
                        <li>{error}</li>
                    })}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    value={email}
                    name='email'
                    placeholder='email@email.com'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    value={username}
                    name='username'
                    placeholder='dontuserthisname'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    value={password}
                    name='password'
                    placeholder='A strong password (min 6 characters)'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                    type="password"
                    value={confirmPassword}
                    name='confirmPassword'
                    placeholder='Same password as above. Again.'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </form>
        </>
    )
}

export default SignupFormPage
