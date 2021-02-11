import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Select from "react-select"
import logo from "../../Assets/stormlight.png"
import AuthLink from './AuthLink';
import { fetch as apiFetch } from "../../store/csrf.js"
import "./Navigation.css"

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
    dropdownIndicator: (provided, state) => ({
        display: 'none',
    })
}

function Navigation({ authLocation, setAuthLocation }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const [options, setOptions] = useState([])

    const handleClick = (e) => {
        if (!sessionUser) {
            history.push("/signup")
            // <Redirect to="/signup" />
        } else {
            history.push("/dashboard")
            // < Redirect to = "/dashboard" />
        }
    }

    const handleInputChange = (input) => {
        if (input) {
            let searchResult = []
            apiFetch(`/api/stocks/search/${input}`)
                .then((res) => {
                    res.data.search.bestMatches.forEach(match => {
                        searchResult.push({
                            "value": match["1. symbol"],
                            "label": `${match["1. symbol"]} ${match["2. name"].split(" - ")[0]}`
                        })
                    })
                    setOptions(searchResult)
                })
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
                        options={options}
                        pageSize={10}
                        isSearchable={true}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 5,
                            colors: {
                                ...theme.colors,
                                primary: "rgba(30, 143, 255, .25)",
                                primary25: "rgba(30, 143, 255, .25)",
                                // primary50: "#e98641"
                            }
                        })}
                        onInputChange={handleInputChange}
                        placeholder="Search Stock Symbols... "
                        onChange={(e) => {
                            console.log(e.value)
                            // return history.push(`/users/${authenticated.id}/projects/${values.value}`)
                            return history.push(`/stock-detail/${e.value}`)
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
