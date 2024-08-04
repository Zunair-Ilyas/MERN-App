import {useContext} from 'react';
import Navbar from "./Navbar.jsx";
import './Account.css'
import {UserContext} from "./Context.jsx";
import {useNavigate} from "react-router-dom";

const Account = () => {
    const {user, logout} = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout()
        navigate('/Login')
    }
    return (
        <div className='account'>
            <Navbar/>
            <div className='main'>
                <p className='para'>Logged in as ({user?.email})</p>
                <button className='logout-button' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Account;
