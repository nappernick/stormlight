import React from 'react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import "./Navigation.css"

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else if (history.location.pathname === "/signup") {
        sessionLinks = (
            <div className="login">
                <NavLink to="/login">Login</NavLink>
            </div>
        )
    }

    const handleClick = (e) => {
        if (!sessionUser && isLoaded) {
            console.log("here")
            history.push('/signup')
        }
    }

    return (
        <>
            <div className="nav-container" onClick={handleClick}>
                <NavLink exact to="/" className="home-icon">
                    <div className="home-icon">
                        <i className="fas fa-home"></i>
                    </div>
                </NavLink>
                {isLoaded && sessionLinks}
            </div>
        </>
    );
}

export default Navigation;
