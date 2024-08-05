import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({
    user: null,
    setUser: () => {},
    loggedIn: false,
    setLoggedIn: () => {}
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
    const getUser = async () => {
        try {
            const response = await axios.get('https://www.doctor-and-doctor.com/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser({ firstName: response.data.user.firstName, lastName: response.data.user.lastName, email: response.data.user.email });
        } catch (error) {
            console.error('Failed to fetch user:', error);
            logout();
        }
    };

    useEffect(() => {
        if (user === null) {
            getUser();
        }
    }, [loggedIn, user]);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail')
        setUser(null);
        setLoggedIn(false);
    };

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            loggedIn,
            setLoggedIn,
            logout,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
