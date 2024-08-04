import { useEffect, useState } from 'react';
import Navbar from "./Navbar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import pfpIcon from '../assets/pfpIcon.svg';
import './Doctor.css';

const Doctor = () => {
    const { categoryName, id } = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3010/home/${categoryName}/${id}`);
            setData(response.data);
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, [categoryName, id]);

    const handleAppointment = (categoryName, id) => {
        return () => navigate(`/home/${categoryName}/${id}/appointment`, {state: data});
    };
    return (
        <>
            <Navbar />
            <div className='main-container'>
                <div className='pfp-container-doctor'>
                    <img
                        src={data.profilePic ? data.profilePic : pfpIcon}
                        className='pfp-doctor'
                        alt="Doctor's Profile Picture"
                    />
                </div>
                <div className='detail-doctor'>
                    <p className='name-doctor'>{data.firstName} {data.lastName}</p>
                    <p className='specialization-doctor'>{data.specialization}</p>
                    <p className='gender-doctor'>{data.gender}</p>
                    <p className='languages-doctor'>
                        <strong>Languages:</strong> {data.languageSpoken && data.languageSpoken.length > 0 ?
                        data.languageSpoken.map((item, index) => (
                            <span key={index} className='language-item'>
                                {item}{index < data.languageSpoken.length - 1 ? ', ' : ''}
                            </span>
                        )) : 'N/A'}
                    </p>
                    <p className='contact-number-doctor'><strong>Contact Number:</strong> {data.contactNumber}</p>
                    <p className='email-doctor'><strong>Email: </strong>{data.email}</p>
                    <p className='available-hours-doctor'><strong>Available hours:</strong> {data.availableHours}</p>
                    <p className='address-doctor'><strong>Address:</strong> {data.address}</p>
                </div>
            </div>
            <div className='appointment'>
                <button className='appointment-button' onClick={handleAppointment(data.specialization, data._id)}>Book an appointment</button>
            </div>
        </>
    );
};

export default Doctor;
