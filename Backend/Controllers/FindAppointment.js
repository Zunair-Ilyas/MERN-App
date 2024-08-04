const Appointment = require('../Model/Appointment');
const statusCode = require('http-status-codes');

const findAppointments = async (req, res) => {
    const { email } = req.query;
    try {
        const data = await Appointment.find({ email });
        return res.status(statusCode.OK).json(data);
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

module.exports = findAppointments;
