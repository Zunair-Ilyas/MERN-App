const express = require('express');
const router = express.Router();
const register = require('../Controllers/Register')
const UserExists = require('../Middleware/UserExists')
const AuthenticateToken = require('../Middleware/Authenticate-Token')
const AuthenticateUser = require('../Middleware/Authenticate-User')
const login = require('../Controllers/Login')
const data = require('../Controllers/Home')
const User = require('../Controllers/User')
const DoctorCategories = require('../Controllers/DoctorCategory')
const CategoriesData = require("../Controllers/DoctorCategory");
const DoctorListData = require('../Controllers/DoctorList');
const DoctorData = require('../Controllers/Doctor')
const AppointmentBooking = require('../Controllers/AppointmentBooking')
const FindAppointments = require('../Controllers/FindAppointment')
const GetOneAppointment = require('../Controllers/GetOneAppointment')
const DeleteAppointment = require('../Controllers/DeleteAppointment')

router.route('/Register').post(UserExists, register)
router.route('/Login').post(AuthenticateUser, login)
router.route('/home').get(AuthenticateToken, data)
router.route('/user').get(AuthenticateToken ,User)
router.route('/categories').get(CategoriesData)
router.route('/home/:categoryName').get(DoctorListData)
router.route('/home/:categoryName/:id').get(DoctorData)
router.route('/home/:categoryName/:id/appointment').post(AppointmentBooking)
router.route('/bookings').get(FindAppointments)
router.route('/bookings/singleAppointment').get(GetOneAppointment)
router.route('/bookings/:AppointmentID').delete(DeleteAppointment)

module.exports = router;