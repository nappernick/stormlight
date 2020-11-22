import React from 'react'
import "./Navigation.css"

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
