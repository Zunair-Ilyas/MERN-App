import { useContext, useState, useEffect } from 'react';
import Navbar from "./Navbar.jsx";
import axios from 'axios';
import './Login.css';
import statusCode from "http-status-codes";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { UserContext } from "./Context.jsx";

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser, setLoggedIn } = useContext(UserContext);
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || '')

    useEffect(() => {
        setLoggedIn(false)
        setMessage('')
    }, [setLoggedIn, message]);

    const handleChange = (e) => {
        setError(null);
        setMessage('')
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.email || !data.password) {
            setError('Please fill all the fields');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('https://d-and-d-backend.vercel.app/Login', data);
            const { token, message} = response.data;
            const { firstName, lastName, email} = response.data.user
            localStorage.setItem('token', token);
            console.log(message, token, firstName, email);
            setData({
                email: '',
                password: ''
            });
            setError(null);
            setUser({firstName:firstName, lastName:lastName, email:email});
            localStorage.setItem('userEmail', email)
            setLoggedIn(true)
            navigate('/home');
        } catch (e) {
            if (e.response && e.response.status === statusCode.BAD_REQUEST) {
                setError('Invalid email or password');
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
            <div className="Login-container">
                {message && <p className='message'>{message}</p>}
                <p>LOGIN</p>
                <form className='LoginForm' onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        onChange={handleChange}
                        name='email'
                        placeholder='e.g: John@example.com'
                        id='email'
                        value={data.email}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        onChange={handleChange}
                        name='password'
                        placeholder='password'
                        id='password'
                        value={data.password}
                    />
                    {error ? <p className='error'>{typeof error === 'object' ? JSON.stringify(error) : error}</p> : null}
                    <button disabled={loading}>{loading ? 'Processing...' : 'Login'}</button>
                </form>
                <p className='redirect'>Don&#39;t have an account? <Link to='/register' className='login-link'>Register now!</Link></p>
            </div>
        </div>
    );
};

export default Login;