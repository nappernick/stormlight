import React from 'react'
import { NavLink } from "react-router-dom"

function AuthLink({ location }) {
    return (
        <div className={location} >
            <NavLink to={`/${location}`}>{location}</NavLink>
        </ div>
    )
}

export default AuthLink
