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

    if (sessionUser) return <Redirect to="/" />
    let res;
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([]);
        res = dispatch(sessionActions.login({
            credential,
            password
        })).catch((res) => { if (res.data && res.data.errors) setErrors(res.data.errors) })
    }

    console.error(res)
    return (
        <>
            <ul>
                {errors.map(error => <li>{error}</li>)}
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
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginFormPage;
