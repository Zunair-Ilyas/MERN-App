import { useContext } from "react";
import {Navigate, useLocation} from "react-router-dom";
import { UserContext } from "./Context.jsx";

const PrivateRoute = ({ children }) => {
    const { loggedIn } = useContext(UserContext);
    const location = useLocation();

    return loggedIn ? children : <Navigate to="/login" state={{ from: location, message: 'Please log in to continue' }} />;
};

export default PrivateRoute;
