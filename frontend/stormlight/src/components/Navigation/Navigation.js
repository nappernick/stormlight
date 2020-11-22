import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import "./Navigation.css"
import LoginLink from './LoginLink';
import SignupLink from './SignupLink';
import { useEffect } from 'react';

function Navigation() {
    const isLoaded = useSelector(state => state.loaded.loaded)
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else if (history.location.pathname === "/signup") {
        sessionLinks = <LoginLink />
    } else if (history.location.pathname === "/login") {
        sessionLinks = <SignupLink />
    }

    const handleClick = (e) => {
        if (!sessionUser && isLoaded) {
            <Redirect to="/signup" />
        } else {
            <Redirect to="/dashboard" />
        }
    }

    return (
        <>
            <div className="nav-container">
                <div className="home-icon" onClick={handleClick}>
                    <i className="fas fa-home"></i>
                </div>
                {isLoaded && sessionLinks}
            </div>
        </>
    );
}

export default Navigation;
