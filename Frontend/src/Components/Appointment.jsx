import { useContext, useState, useEffect } from 'react';
import Navbar from "./Navbar.jsx";
import { UserContext } from "./Context.jsx";
import './Appointment.css';
import axios from 'axios';
import {useLocation, useNavigate} from "react-router-dom";

const Appointment = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const data = location.state;
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [patient, setPatient] = useState({
        firstName: '',
        lastName: '',
        email: localStorage.getItem('userEmail'),
        gender: '',
        DOB: '',
        contactNumber: '',
        address: '',
        appointmentDate: '',
        appointmentTime: '',
        doctor_email: data.email,
        doctor_address: data.address,
        doctor_specialization: data.specialization,
        doctor_name: `${data.firstName} ${data.lastName}`,
        doctor_contact: data.contactNumber
    });

    const parseAvailableHours = (availableHours) => {
        // Split the input string into start and end times
        const [start, end] = availableHours.split(' to ');

        const formatTime = (time) => {
            const [hourMinute, period] = time.split(' ');
            if (!hourMinute || !period) {
                throw new Error(`Invalid time format: ${time}`);
            }

            const [hour, minute] = hourMinute.split(':');
            if (!hour) {
                throw new Error(`Hour is missing in time format: ${time}`);
            }

            let hour24 = parseInt(hour, 10);
            if (period === 'PM' && hour24 < 12) hour24 += 12;
            if (period === 'AM' && hour24 === 12) hour24 = 0;

            // Manually ensure hour and minute are two digits
            const hourStr = hour24 < 10 ? '0' + hour24 : hour24;
            const minuteStr = minute ? (minute.length === 1 ? '0' + minute : minute) : '00';

            return `${hourStr}:${minuteStr}`;
        };

        return {
            start: formatTime(start),
            end: formatTime(end)
        };
    };



    const availableHours = parseAvailableHours(data.availableHours);

    const handleChange = (e) => {
        setPatient(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`https://d-and-d-backend.vercel.app/home/${data.specialization}/${data._id}/appointment`, patient);
            setPatient({
                firstName: '',
                lastName: '',
                email: localStorage.getItem('userEmail'),
                gender: '',
                DOB: '',
                contactNumber: '',
                address: '',
                appointmentDate: '',
                appointmentTime: '',
                doctor_email: data.email,
                doctor_address: data.address,
                doctor_specialization: data.specialization,
                doctor_name: `${data.firstName} ${data.lastName}`,
                doctor_contact: data.contactNumber
            });
            setMessage('Appointment Booked Successfully');
            console.log(response.data);
            console.log(user);
        } catch (error) {
            console.error("There was an error creating the appointment!", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMessage(null);
    }, []);

    const handleRedirect = () => {
        navigate('/home');
    }

    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <Navbar />
            <div className="appointment-form">
                <form className='form' onSubmit={handleSubmit}>
                    <div className='firstName-appointment position'>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            type='text'
                            name='firstName'
                            placeholder='e.g: John'
                            id='firstName'
                            onChange={handleChange}
                            value={patient.firstName}
                            required
                        />
                    </div>
                    <div className='lastName-appointment position'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            type='text'
                            name='lastName'
                            placeholder='e.g: Doe'
                            id='lastName'
                            onChange={handleChange}
                            value={patient.lastName}
                            required
                        />
                    </div>
                    <div className='gender-input-appointment'>
                        <label>Gender:</label>
                        <div>
                            <input
                                type='radio'
                                name='gender'
                                id='male'
                                onChange={handleChange}
                                value='male'
                                checked={patient.gender === 'male'}
                                required
                            />
                            <label htmlFor='male'>Male</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='gender'
                                id='female'
                                onChange={handleChange}
                                value='female'
                                checked={patient.gender === 'female'}
                                required
                            />
                            <label htmlFor='female'>Female</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='gender'
                                id='other'
                                onChange={handleChange}
                                value='other'
                                checked={patient.gender === 'other'}
                                required
                            />
                            <label htmlFor='other'>Other</label>
                        </div>
                    </div>
                    <div className='dob-appointment position'>
                        <label htmlFor='DOB'>Date of Birth</label>
                        <input
                            type='date'
                            name='DOB'
                            id='DOB'
                            value={patient.DOB}
                            min='1900-01-01'
                            max={today}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='contactNumber-appointment position'>
                        <label htmlFor='contactNumber'>Contact Number</label>
                        <input
                            type='tel'
                            name='contactNumber'
                            id='contactNumber'
                            value={patient.contactNumber}
                            onChange={handleChange}
                            pattern="^\+92-\d{3}-\d{7}$"
                            placeholder='e.g: +92-323-3573745'
                            required
                        />
                    </div>
                    <div className='address-appointment position'>
                        <label htmlFor='address'>Address</label>
                        <textarea
                            id="address"
                            name="address"
                            value={patient.address}
                            onChange={handleChange}
                            rows="4"
                            cols="50"
                            placeholder="Enter your address here"
                            required
                        />
                    </div>
                    <div className='appointmentDate-appointment position'>
                        <label htmlFor='appointmentDate'>Appointment Date</label>
                        <input
                            type="date"
                            id="appointmentDate"
                            name="appointmentDate"
                            value={patient.appointmentDate}
                            onChange={handleChange}
                            min={today}
                            required
                        />
                    </div>
                    <div className='appointmentTime-appointment position'>
                        <label htmlFor='appointmentTime'>Appointment Time</label>
                        <input
                            type="time"
                            id="appointmentTime"
                            name="appointmentTime"
                            value={patient.appointmentTime}
                            onChange={handleChange}
                            min={availableHours.start}
                            max={availableHours.end}
                            required
                        />
                    </div>
                    {message !== null ?
                        <div>
                            <p className='success-message'>{message}</p>
                            <p onClick={handleRedirect} className='redirect-to-home'>Go to Home Page</p>
                        </div>
                        : null
                    }

                    <button className='book-button' disabled={loading}>
                        {loading ? 'Booking...' : 'Book'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Appointment;
