import Register from "./Components/Register.jsx";
import './App.css'
import Login from "./Components/Login.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Components/Home.jsx";
import Bookings from "./Components/Bookings.jsx";
import Members from "./Components/Members.jsx";
import Account from "./Components/Account.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import CategoryPage from './Components/CategoryPage.jsx'
import Doctor from "./Components/Doctor.jsx";
import Appointment from "./Components/Appointment.jsx";
import NotFound from "./Components/NotFound.jsx";
import WelcomePage from "./Components/WelcomePage.jsx";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/home" element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />
            <Route path="/bookings" element={
                <PrivateRoute>
                    <Bookings />
                </PrivateRoute>
            } />
            <Route path="/members" element={
                <PrivateRoute>
                    <Members />
                </PrivateRoute>
            } />
            <Route path="/account" element={
                <PrivateRoute>
                    <Account />
                </PrivateRoute>
            } />
            <Route path="/home/:categoryName" element={
                <PrivateRoute>
                    <CategoryPage />
                </PrivateRoute>
            } />
            <Route path="/home/:categoryName/:id" element={
                <PrivateRoute>
                    <Doctor />
                </PrivateRoute>
            } />
            <Route path="/home/:categoryName/:id/appointment" element={
                <PrivateRoute>
                    <Appointment />
                </PrivateRoute>
            } />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    </Router>
  )
}

export default App
