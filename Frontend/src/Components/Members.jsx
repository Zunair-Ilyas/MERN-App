import { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import './Members.css';
import axios from "axios";

const Members = () => {
    const [member, setMember] = useState({
        firstName: '',
        lastName: '',
        email: localStorage.getItem('userEmail'),
        gender: '',
        specialization: '',
        address: '',
        contactNumber: '',
        availableHours: '',
        languageSpoken: [],
        profilePic: ''
    });

    const [time, setTime] = useState({
        startTime: '',
        endTime: ''
    });

    const [languageInput, setLanguageInput] = useState('');
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isMember, setIsMember] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setTime(prev => {
            const updatedTime = {
                ...prev,
                [name]: value
            };

            if (updatedTime.startTime && updatedTime.endTime) {
                const formattedTime = `${formatTime(updatedTime.startTime)} to ${formatTime(updatedTime.endTime)}`;
                setMember(prevMember => ({
                    ...prevMember,
                    availableHours: formattedTime
                }));
            }

            return updatedTime;
        });
    };

    const formatTime = (timeString) => {
        const [hour, minute] = timeString.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12; // Convert 0 to 12 for midnight
        return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    };

    const handleLanguageChange = (e) => {
        setLanguageInput(e.target.value);
    };

    const addLanguage = () => {
        if (languageInput.trim() !== '') {
            setLanguages(prev => [...prev, languageInput.trim()]);
            setMember(prev => ({
                ...prev,
                languageSpoken: [...prev.languageSpoken, languageInput.trim()]
            }));
            setLanguageInput('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:3010/members`, member);
            console.log(response);
            setMember({
                firstName: '',
                lastName: '',
                email: localStorage.getItem('userEmail'),
                gender: '',
                specialization: '',
                address: '',
                contactNumber: '',
                availableHours: '',
                languageSpoken: [],
                profilePic: ''
            });
            setLanguages([]);
            setMessage('Profile Created Successfully');
            setIsMember(true);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMember(prev => ({
                    ...prev,
                    profilePic: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const checkMembershipStatus = async () => {
        try {
            const response = await axios.get('https://d-and-d-backend.vercel.app/members', {
                params: { email: localStorage.getItem('userEmail') }
            });
            setIsMember(response.data._id.length > 0);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkMembershipStatus();
    }, []);



    return (
        <>
            <Navbar/>
            {!isMember ? (
                <>
                    {!showForm ? (
                        <div className='join-container'>
                            <p className='join-us-para'>Join us as a Doctor</p>
                            <button onClick={() => setShowForm(!showForm)} className='join-us-button'>Join</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className='member-form'>
                            <div className='level-one'>
                                <div className='firstName-input member-input'>
                                    <label htmlFor='firstName'>First Name</label>
                                    <input
                                        type="text"
                                        name='firstName'
                                        id='firstName'
                                        placeholder='e.g: John'
                                        value={member.firstName}
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </div>
                                <div className='lastName-input member-input'>
                                    <label htmlFor='lastName'>Last Name</label>
                                    <input
                                        type="text"
                                        name='lastName'
                                        id='lastName'
                                        placeholder='e.g: Doe'
                                        value={member.lastName}
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className='level-two'>
                                <div className='gender-input member-input'>
                                    <label>Gender</label>
                                    <input
                                        type='radio'
                                        name='gender'
                                        id='male'
                                        value='male'
                                        onChange={handleChange}
                                        checked={member.gender === 'male'}
                                        required={true}
                                    />
                                    <label htmlFor='male'>Male</label>
                                    <input
                                        type='radio'
                                        name='gender'
                                        id='female'
                                        value='female'
                                        onChange={handleChange}
                                        checked={member.gender === 'female'}
                                        required={true}
                                    />
                                    <label htmlFor='female'>Female</label>
                                    <input
                                        type='radio'
                                        name='gender'
                                        id='other'
                                        value='other'
                                        onChange={handleChange}
                                        checked={member.gender === 'other'}
                                        required={true}
                                    />
                                    <label htmlFor='other'>Other</label>
                                </div>
                                <div className='specialization-input member-input'>
                                    <label htmlFor='specialization'>Specialization</label>
                                    <select
                                        name='specialization'
                                        id='specialization'
                                        value={member.specialization}
                                        onChange={handleChange}
                                        required={true}
                                    >
                                        <option value=''>Select Specialization</option>
                                        <option value='ENT Specialist'>ENT Specialist</option>
                                        <option value='Dermatologist'>Dermatologist</option>
                                        <option value='Cardiologist'>Cardiologist</option>
                                        <option value='Pediatrician'>Pediatrician</option>
                                        <option value='Orthopedic Surgeon'>Orthopedic Surgeon</option>
                                        <option value='Neurologist'>Neurologist</option>
                                        <option value='Gynecologist'>Gynecologist</option>
                                        <option value='Oncologist'>Oncologist</option>
                                        <option value='Psychiatrist'>Psychiatrist</option>
                                        <option value='Ophthalmologist'>Ophthalmologist</option>
                                    </select>
                                </div>
                            </div>
                            <div className='level-three'>
                                <div className='email-input member-input'>
                                    <label htmlFor='email'>Email</label>
                                    <input
                                        type="email"
                                        name='email'
                                        id='email'
                                        placeholder='e.g: John@example.com'
                                        value={localStorage.getItem('userEmail')}
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </div>
                                <div className='contactNumber-input member-input'>
                                    <label htmlFor='contactNumber'>Contact Number</label>
                                    <input
                                        type="tel"
                                        name='contactNumber'
                                        id='contactNumber'
                                        pattern="^\+92-\d{3}-\d{7}$"
                                        placeholder='e.g: +92-323-3573745'
                                        value={member.contactNumber}
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className='availableHours-input member-input'>
                                <label className='availableHours-input-title'>Available Hours :</label>
                                <div className='time'>
                                    <div className='from'>
                                        <label htmlFor='startTime'>from</label>
                                        <input
                                            type='time'
                                            name='startTime'
                                            id='startTime'
                                            value={time.startTime}
                                            onChange={handleTimeChange}
                                            required={true}
                                        />
                                    </div>
                                    <div className='to'>
                                        <label htmlFor='endTime'>to</label>
                                        <input
                                            type='time'
                                            name='endTime'
                                            id='endTime'
                                            value={time.endTime}
                                            onChange={handleTimeChange}
                                            required={true}
                                        />
                                    </div>
                                </div>
                                {member.availableHours && (
                                    <p>Available Hours: {member.availableHours}</p>
                                )}
                            </div>
                            <div className='languages-input member-input'>
                                <div className='languages-input-container'>
                                    <label htmlFor='language'>Languages Spoken</label>
                                    <input
                                        type="text"
                                        name='language'
                                        id='language'
                                        value={languageInput}
                                        onChange={handleLanguageChange}
                                        placeholder='Enter your language(s)'
                                    />
                                </div>
                                <button type="button" onClick={addLanguage} className='language-button'>Add Language</button>
                                <ul>
                                    {languages.map((language, index) => (
                                        <li key={index}>{language}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='address-input member-input'>
                                <label htmlFor='address'>Address</label>
                                <textarea
                                    cols='20'
                                    rows='4'
                                    name='address'
                                    id='address'
                                    placeholder='e.g: 123 Main St, City, Country'
                                    value={member.address}
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>
                            <div className='profilePic-input member-input'>
                                <label htmlFor='profilePic'>Profile Picture</label>
                                <input
                                    type="file"
                                    name='profilePic'
                                    id='profilePic'
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                />
                                {member.profilePic && (
                                    <div>
                                        <img src={member.profilePic} alt="Profile" style={{width: '100px', height: '100px'}}/>
                                    </div>
                                )}
                            </div>
                            {message && <p className='success-message'>{message}</p>}
                            <button className='member-submit-button' disabled={loading}>{loading ? 'Submitting' : 'Submit'}</button>
                        </form>
                    )}
                </>
            ) : (
                <p className='you-are-member'>You are a member</p>
            )}
        </>
    );
};

export default Members;
