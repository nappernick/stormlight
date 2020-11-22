import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom"
import * as sessionActions from '../../store/session';
import { load } from "../../store/isLoaded"
import undraw from "../../Assets/undraw_Login_re_4vu2.svg"
import "./LoginFormPage.css"

const LoginFormPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    // debugger
    if (sessionUser) { <Redirect to="/dashboard" /> }

    useEffect(() => {
        dispatch(load())
    }, [dispatch, history])

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
        <div className="container">
            <div className="image">
                <img src={undraw} alt="Login" />
            </div>
            <ul>
                {errors.map(error => <li>{error}</li>)}
            </ul>
            <form className="login" onSubmit={handleSubmit}>

                <h3> Welcome to Stormlight </h3>
                <div>
                    <label htmlFor="credential">Username/email: </label>
                </div>
                <div>
                    <input type="text"
                        name="credential"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        className="login"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                </div>
                <div>
                    <input type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login"
                    />
                </div>
                <div>
                    <button type="submit" className="login">Login</button>
                </div>
                <div>
                    <button className="login" onClick={handleDemo}>Demo Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginFormPage;
