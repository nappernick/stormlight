import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import "./Navigation.css"
import AuthLink from './AuthLink';

function Navigation() {
    const isLoaded = useSelector(state => state.loaded.loaded)
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const [authLocation, setAuthLocation] = useState(history.location.pathname)

    useEffect(() => {
        // console.log("here", authLocation)
        setAuthLocation(history.location.pathname)
        // if (sessionUser) {
        //     sessionLinks = <ProfileButton user={sessionUser} />
        // } else {
        //     sessionLinks = <AuthLink location={authLocation === "/signup" ? "login" : "signup"} />
        // }
    }, [history.location.pathname])

    const handleClick = (e) => {
        console.log(sessionUser, isLoaded)
        if (!sessionUser && isLoaded) {
            history.push("/signup")
            // <Redirect to="/signup" />
        } else {
            history.push("/dashboard")
            // < Redirect to = "/dashboard" />
        }
    }

    return (
        <>
            <div className="nav-container">
                <div className="home-icon" onClick={handleClick}>
                    <i className="fas fa-home"></i>
                </div>
                {isLoaded ? sessionUser ? <ProfileButton user={sessionUser} /> : <AuthLink location={authLocation === "/signup" ? "login" : "signup"} /> : ''}
            </div>
        </>
    );
}

export default Navigation;
