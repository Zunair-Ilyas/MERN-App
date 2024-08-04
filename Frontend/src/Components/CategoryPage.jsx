import {useNavigate, useParams} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import './CategoryPage.css'
import axios from 'axios'
import {useEffect, useState} from "react";
import pfpIcon from '../assets/pfpIcon.svg'

const CategoryPage = () => {
    const {categoryName} = useParams()
    const [Data, setData] = useState([])
    const navigate = useNavigate();
    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3010/home/${categoryName}`)
            setData(response.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getData()
    }, []);

    const handleView = (categoryName, id) => {
        return () => navigate(`/home/${categoryName}/${id}`);
    }
    return (
        <>
            <Navbar/>
            <p className='title'>{categoryName}</p>
            <div className='main'>
                {Data.length === 0 && <p className='unavailable'>No Doctors Available in this Category.</p>}
                {Data.map((item, index) => {
                    return (
                        <div
                            className='doctor'
                            key={index}
                        >
                            <div className='pfp-container'>
                                <img src={item.profilePic ? item.profilePic : pfpIcon} className='pfp' alt="Doctor's Profile Picture"/>
                            </div>
                            <div className='detail'>
                                <div className='top'>
                                    <p className='name'>{item.firstName + " " + item.lastName}</p>
                                    <p className='specialization'>{item.specialization}</p>
                                    <button className='view-button' onClick={handleView(item.specialization, item._id)}>View</button>
                                </div>
                                {/*<div className='contact'>*/}
                                {/*    <p className='contact-number'>{item.contactNumber}</p>*/}
                                {/*    <p className='email'>{item.email}</p>*/}
                                {/*</div>*/}
                                <p className='available-hours'>{item.availableHours}</p>
                                <p className='address'>{item.address}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default CategoryPage;