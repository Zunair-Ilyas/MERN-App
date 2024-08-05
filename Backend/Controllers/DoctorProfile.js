const Doctor = require('../Model/Doctor-Schema');
const statusCode = require('http-status-codes');

const DoctorProfile = async (req, res) => {
    const { email } = req.query;
    try {
        // Use findOne to fetch a single document
        const data = await Doctor.findOne({ email });

        if (!data) {
            // Handle the case where no document is found
            return res.status(statusCode.NOT_FOUND).json({ message: 'Doctor not found' });
        }

        res.status(statusCode.OK).json(data);
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

module.exports = DoctorProfile;
