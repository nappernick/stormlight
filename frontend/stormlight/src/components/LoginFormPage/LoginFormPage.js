import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const LoginFormPage = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    // debugger
    if (sessionUser) return <Redirect to="/dashboard" />

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([]);
        dispatch(sessionActions.login({
            credential,
            password
        })).catch((res) => { if (res.data && res.data.errors) setErrors(res.data.errors) })
    }

    const handleDemo = async (e) => {
        e.preventDefault()
        dispatch(sessionActions.login({
            credential: "Demo-lition",
            password: "password"
        }))
    }

    return (
        <>
            <ul>
                {errors.map(error => <li>{error}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="credential">Username/email: </label>
                    <input type="text"
                        name="credential"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                    <button onClick={handleDemo}>Demo Login</button>
                </div>
            </form>
        </>
    )
}

export default LoginFormPage;
