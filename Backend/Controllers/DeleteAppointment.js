const Appointment = require('../Model/Appointment')
const statusCodes = require('http-status-codes')

const DeleteAppointment = async (req, res) => {
    const {id} = req.params
    try {
        const deletedAppointment = await Appointment.deleteOne({id})
        return res.status(statusCodes.NO_CONTENT).json(deletedAppointment)
    } catch (e) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
    }
}

module.exports = DeleteAppointment