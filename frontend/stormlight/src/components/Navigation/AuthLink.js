import React from 'react'

function AuthLink({ authLocation, setAuthLocation }) {
    const toggleAuthLoc = (e) => {
        if (authLocation === "login") setAuthLocation("signup")
        else setAuthLocation("login")
    }
    return (
        <div className='' >
            <button onClick={toggleAuthLoc}>{authLocation === "signup" ? "Login" : "Signup"}</button>
        </ div>
    )
}

export default AuthLink
