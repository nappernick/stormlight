import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import * as sessionActions from "../../store/session"
import "./SignupFormPage.css"

function FormFields({ setErrors }) {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
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
            <h2>Make Your Money Move</h2>
            <p>Stormlight lets you "invest" in companies you love, commission-free. Primarily because you're not actually investing.</p>
            <form onSubmit={handleSubmit}>
                <div className="input">
                    <input
                        type="email"
                        value={email}
                        name='email'
                        placeholder='email@email.com'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <input
                        type="text"
                        value={username}
                        name='username'
                        placeholder='dontuserthisname'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input">
                    <input
                        type="password"
                        value={password}
                        name='password'
                        placeholder='A strong password (min 6 characters)'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input">
                    <input
                        type="password"
                        value={confirmPassword}
                        name='confirmPassword'
                        placeholder='Same password as above. Again.'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="button">
                    <button type="submit">Signup</button>
                </div>
                <span></span>
            </form>
        </>
    )
}

export default FormFields
