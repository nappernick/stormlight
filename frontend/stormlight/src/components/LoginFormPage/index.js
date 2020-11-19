import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const LoginFormPage = () => {
    const sessionUser = sessionActions.useSelector(state => state.session.user)
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to="/" />

    handleSubmit = (e) => {
        e.preventDefault()
        try {
            dispatch(sessionUser.login({
                credential,
                password
            }))
        } catch (e) {
            setErrors([...e.errors])
        }
    }

    return (
        <>
            <ul>
                {errors.map(error => (
                    <li>{error}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label htmlFor="credential">Username/email: </label>
                <input type="text"
                    name="credential"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                />
                <label htmlFor="password">Password: </label>
                <input type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>
        </>
    )
}

export default LoginFormPage;
