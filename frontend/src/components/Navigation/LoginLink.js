import React from 'react'
import { NavLink } from "react-router-dom"

function LoginLink() {
    return (
        <div>
            <div className="login">
                <NavLink to="/login">Login</NavLink>
            </div>
        </div>
    )
}

export default LoginLink
