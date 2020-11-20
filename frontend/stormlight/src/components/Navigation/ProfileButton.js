import React, { useState } from 'react'
import * as sessionActions from "../../store/session"
import { useDispatch, useSelector } from 'react-redux'

function ProfileButton() {
    const [menu, setMenu] = useState(false)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const toggleMenu = () => {
        if (!menu) return setMenu(true)
        else setMenu(false)
    }

    return (
        <div className="profile-button">
            <button onClick={toggleMenu}>
                <i className="fas fa-user-circle"></i>
            </button>
            {menu && (
                <ul>
                    {/* <li>{sessionUser.name}</li> */}
                    <li>{sessionUser.username}</li>
                    <li><button onClick={() => dispatch(sessionActions.remove())}>Logout</button></li>
                </ul>
            )}
        </div>
    )
}

export default ProfileButton
