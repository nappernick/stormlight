import React from 'react'
import * as sessionActions from "../../store/session"
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';


function ProfileButton() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    function onSelect() {
        dispatch(sessionActions.remove())
        window.location.reload();
    }

    const menuCallback = () => (
        <Menu onSelect={onSelect}>
            <MenuItem disabled>{sessionUser.username}</MenuItem>
            <Divider />
            <MenuItem style={{ cursor: "pointer" }} key="2">Logout</MenuItem>
        </Menu>
    );

    return (
        <div>
            {/* <button className="profile-icon" onClick={toggleMenu}> */}
            <Dropdown
                trigger={['hover']}
                overlay={menuCallback}
                animation="slide-up"
            >
                <button className="profile-icon" style={{ width: 100 }}>
                    <i className="fas fa-user-circle  fa-lg"></i>
                </button>
            </Dropdown>
            {/* {menu && (
                <ul className="profile-drop">
                    <li>{sessionUser.name}</li>
                    <li>{sessionUser.username}</li>
                    <li className="logout" onClick={() =>
                        dispatch(sessionActions.remove())}>
                        Logout
                    </li>
                </ul>
            )
            } */}
        </div >
    )
}

export default ProfileButton
