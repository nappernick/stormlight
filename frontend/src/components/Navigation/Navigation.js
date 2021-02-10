import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Select from "react-select"
import logo from "../../Assets/stormlight.png"
import "./Navigation.css"
import AuthLink from './AuthLink';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '30px',
        height: '30px',
        width: "350px",
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '30px',
        padding: '0 6px'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',
    }),
}

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
                {sessionUser && <div className="search__container">
                    <Select
                        styles={customStyles}
                        // options={}
                        isSearchable={true}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 5,
                            colors: {
                                ...theme.colors,
                                primary: "#fbb430",
                                primary25: "#fbb430",
                                // primary50: "#e98641"
                            }
                        })}
                        placeholder="Search Projects... "
                        onChange={(values) => {
                            // return history.push(`/users/${authenticated.id}/projects/${values.value}`)
                            // return history.push(`/projects`)
                        }} />
                </div>}
                {sessionUser ?
                    <ProfileButton user={sessionUser} /> :
                    <AuthLink authLocation={authLocation} setAuthLocation={setAuthLocation} />
                }
            </div>
        </>
    );
}

export default Navigation;
