const DoctorList = require('../Model/Doctor-Schema');
const statusCode = require('http-status-codes');

const DoctorData = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await DoctorList.findById(id)
        res.status(statusCode.OK).json(data)
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
}

module.exports = DoctorData;