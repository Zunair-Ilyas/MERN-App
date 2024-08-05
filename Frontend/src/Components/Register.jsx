import { useContext, useState, useEffect } from 'react';
import './Register.css';
import Navbar from "./Navbar.jsx";
import axios from "axios";
import statusCode from "http-status-codes";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./Context.jsx";

function Register() {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setUser, setLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedIn(false);
    }, [setLoggedIn]);

    const handleChange = e => {
        setError(null);
        setData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!data.firstName || !data.lastName || !data.email || !data.password) {
            setError('Please fill all the fields');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('https://d-and-d-backend.vercel.app/Register', data);
            const { token } = response.data;
            localStorage.setItem('token', token);
            setData({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
            setError(null);
            setUser({ firstName: data.firstName, lastName: data.lastName, email:data.email});
            localStorage.setItem('userEmail', data.email)
            console.log(data.firstName);
            setLoggedIn(true);
            navigate('/home');
        } catch (e) {
            if (e.response && e.response.status === statusCode.CONFLICT) {
                setError('User already exists');
            } else if (e.response && e.response.status === statusCode.UNAUTHORIZED) {
                setError('Access denied');
            } else {
                setError(e.response ? e.response.data.error : 'An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="Register-container">
                <p>REGISTER</p>
                <form className="RegisterForm" onSubmit={handleSubmit}>
                    <div className='upper'>
                        <div className='input'>
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                name='firstName'
                                placeholder='e.g: John'
                                id='first_name'
                                value={data.firstName}
                            />
                        </div>
                        <div className='input'>
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                name='lastName'
                                placeholder='e.g: Doe'
                                id='last_name'
                                value={data.lastName}
                            />
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='input'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                onChange={handleChange}
                                name='email'
                                placeholder='e.g: John@example.com'
                                id='email'
                                value={data.email}
                            />
                        </div>
                        <div className='input'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                onChange={handleChange}
                                name='password'
                                placeholder='password'
                                id='password'
                                value={data.password}
                            />
                        </div>
                    </div>
                    {error ? <p className='error'>{error}</p> : null}
                    <button disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
                </form>
                <p className='redirect'>Already have an account? <Link to='/login' className='login-link'>Login
                    now!</Link></p>
            </div>
        </div>
    );
}

export default Register;