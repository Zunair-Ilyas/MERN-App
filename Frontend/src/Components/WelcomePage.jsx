import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; // Optional: for custom styling

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register'); // Navigate to the registration page
    };

    const handleLogin = () => {
        navigate('/login'); // Navigate to the login page
    };

    return (
        <div className="welcome-page">
            <h1 className='welcome'>Welcome to Our Website!</h1>
            <p className='welcome-note'>Welcome to D&D, where you can easily book appointments with various doctors.
                You can view all your appointments on a dedicated page, cancel appointments if needed,
                and even join us as a doctor. Rest assured, your data is secure with us.</p>
            <div className="button-container">
                <button onClick={handleRegister}>Register</button>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default WelcomePage;
