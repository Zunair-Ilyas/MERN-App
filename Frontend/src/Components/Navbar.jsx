import './Navbar.css'
import user_icon from '../assets/User.svg'
import menu_icon from '../assets/menu.svg'
import {useContext, useState} from 'react'
import {UserContext} from "./Context.jsx";
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
    const {user, loggedIn } = useContext(UserContext);
    const [dropDown, setDropDown] = useState(false)
    const location = useLocation()
    const currentLocation = location.pathname

    const navItems = [
        {name: "Home", path: "/home"},
        {name: "Bookings", path: "/bookings"},
        {name: "Join Us", path: "/members"}
    ]

    const handleDropDown = () => {
        setDropDown(!dropDown)
    }
    const closeDropDown = () => {
        setDropDown(false);
    }

    return (
        <nav className="navbar">
            <p>D&D</p>
            <ul className='navbar-list'>
                {navItems.map((item, index) => (
                    <li
                        key={index}
                        className={currentLocation.includes(item.path)  ? "active" : ""}
                    >
                        <Link to={item.path}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className='user'>
                <img src={menu_icon} alt='' onClick={handleDropDown}/>
                {dropDown && (
                    <div className='dropdown-menu'>
                        <Link to={loggedIn ? '/account' : '/login'} onClick={closeDropDown}>
                            {loggedIn ? 'Logout' : 'Login'}
                        </Link>
                    </div>
                )}
                <Link to={loggedIn ? '/account' : '/login'}>
                    <img src={user_icon} alt=""/>
                </Link>
                {(user?.firstName && loggedIn) && <p>{user.firstName}</p>}
            </div>
        </nav>
    );
};

export default Navbar;