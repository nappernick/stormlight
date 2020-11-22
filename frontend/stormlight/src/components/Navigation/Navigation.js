import React from 'react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import "./Navigation.css"
import LoginLink from './LoginLink';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else if (history.location.pathname === "/signup") {
        sessionLinks = <LoginLink />
    } else if (history.location.pathname === '/login') {
        sessionLinks = (
            <div className="signup">
                <NavLink to="/signup">Signup</NavLink>
            </div>
        )
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
