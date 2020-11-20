import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import "./Navigation.css"

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    console.log(history)
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
    // else {
    //     sessionLinks = (
    //         <>
    //             <NavLink to="/login">Log In</NavLink>
    //             <NavLink to="/signup">Sign Up</NavLink>
    //         </>
    //     );
    // }

    return (
        <>
            <div className="nav-container">
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
