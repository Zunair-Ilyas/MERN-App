const Doctor = require('../Model/Doctor-Schema')
const statusCode = require('http-status-codes')

const AllDoctor = async (req, res) => {
    try {
        const response = await Doctor.find()
        return res.status(statusCode.OK).json(response)
    } catch (e) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(e)
    }
}

module.exports = AllDoctor