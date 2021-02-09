import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from "../../Assets/stormlight.png"
import "./Navigation.css"
import AuthLink from './AuthLink';

function Navigation({ authLocation, setAuthLocation }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()

    const handleClick = (e) => {
        if (!sessionUser) {
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
                    <img src={logo} height="50px" alt="Stormlight logo" />
                </div>
                {sessionUser ?
                    <ProfileButton user={sessionUser} /> :
                    <AuthLink authLocation={authLocation} setAuthLocation={setAuthLocation} />
                }
            </div>
        </>
    );
}

export default Navigation;
