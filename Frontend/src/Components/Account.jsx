import {useContext, useEffect, useState} from 'react';
import Navbar from "./Navbar.jsx";
import './Account.css'
import {UserContext} from "./Context.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import pfpIcon from "../assets/pfpIcon.svg";

const Account = () => {
    const {user, logout} = useContext(UserContext);
    const [member, setMember] = useState( null)
    const navigate = useNavigate();
    const handleLogout = () => {
        logout()
        navigate('/Login')
    }
    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3010/members', {
                params: {
                    email: localStorage.getItem('userEmail'),
                }
            });
            setMember(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
    }, []);
    return (
        <div className='account'>
            <Navbar/>
            <div className='main'>
                <p className='para'>Logged in as ({user?.email})</p>
                <button className='logout-button' onClick={handleLogout}>Logout</button>
                {member && <div className='main-container'>
                    <div className='pfp-container-doctor'>
                        <img
                            src={member.profilePic ? member.profilePic : pfpIcon}
                            className='pfp-doctor'
                            alt="Doctor's Profile Picture"
                        />
                    </div>
                    <div className='detail-doctor'>
                        <p className='name-doctor'>{member.firstName} {member.lastName}</p>
                        <p className='specialization-doctor'>{member.specialization}</p>
                        <p className='gender-doctor'>{member.gender}</p>
                        <p className='languages-doctor'>
                            <strong>Languages:</strong> {member.languageSpoken && member.languageSpoken.length > 0 ?
                            member.languageSpoken.map((item, index) => (
                                <span key={index} className='language-item'>
                                {item}{index < member.languageSpoken.length - 1 ? ', ' : ''}
                            </span>
                            )) : 'N/A'}
                        </p>
                        <p className='contact-number-doctor'><strong>Contact Number:</strong> {member.contactNumber}</p>
                        <p className='email-doctor'><strong>Email: </strong>{member.email}</p>
                        <p className='available-hours-doctor'><strong>Available hours:</strong> {member.availableHours}
                        </p>
                        <p className='address-doctor'><strong>Address:</strong> {member.address}</p>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Account;