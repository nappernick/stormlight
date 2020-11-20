import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <>
            <div>
                <NavLink exact to="/">
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
