const Appointment = require('../Model/Appointment');
const statusCode = require('http-status-codes');

const GetOneAppointment = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(statusCode.BAD_REQUEST).json({ error: 'Appointment ID is required' });
    }

    try {
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(statusCode.NOT_FOUND).json({ error: 'Appointment not found' });
        }

        return res.status(statusCode.OK).json(appointment);
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

module.exports = GetOneAppointment;
