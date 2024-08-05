import Navbar from "./Navbar.jsx";
import './Bookings.css'
import { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
    const [BookingData, setBookingData] = useState([]);
    const [Bookings, setBookings] = useState(false)

    const getData = async () => {
        try {
            const { data } = await axios.get('https://www.doctor-and-doctor.com/bookings', {
                params: {
                    email: localStorage.getItem('userEmail')
                }
            });
            const now = new Date().getTime();
            const validBookings = data.filter(booking => {
                const bookingTime = new Date(`${booking.appointmentDate}T${booking.appointmentTime}`).getTime();
                return bookingTime > now;
            });
            setBookingData(validBookings);
            setBookings(validBookings.length === 0);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, [BookingData]);

    const handleClick = async (id) => {
        try {
            const response = await axios.delete(`https://www.doctor-and-doctor.com/bookings/${id}`);
            console.log(response);
            setBookingData(prevData => prevData.filter(booking => booking._id !== id));
        } catch (e) {
            console.log(e);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function formatTime(timeString) {
        const [hour, minute] = timeString.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    }

    return (
        <>
            <Navbar />
            <p className='booking-title'>Your Bookings</p>
            {(BookingData) && BookingData.map((item, index) => (
                <div key={index} className="bookings-container">
                    <div className="bookings-page-container">
                        <div className='booking-card'>
                            <p className='booking-time'>Appointment at {formatTime(item.appointmentTime)} on {formatDate(item.appointmentDate)}</p>
                            <p className='booking-doctor'>Dr. {item.doctor_name}</p>
                            <p className='booking-specialization'>{item.doctor_specialization}</p>
                            <p className='booking-address'>{item.doctor_address}</p>
                            <p className='booking-patient'>Patient: {item.firstName + " " + item.lastName}</p>
                            <p className='booking-id'>Appointment ID: {item._id}</p>
                        </div>
                        <div className='action'>
                            <button className='cancel-button' onClick={() => handleClick(item._id)}>Cancel Appointment</button>
                        </div>
                    </div>
                </div>
            ))}
            {(Bookings) &&
                <div className='empty-bookings'>
                    <p className='empty-bookings-para'>No Bookings Yet!</p>
                </div>
            }
        </>
    );
};

export default Bookings;
