const DoctorList = require('../Model/Doctor-Schema');
const statusCode = require('http-status-codes');

const DoctorListData = async (req, res) => {
    const categoryName = req.params.categoryName;
    try {
        const data = await DoctorList.find({specialization:categoryName})
        res.status(statusCode.OK).json(data)
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
}

module.exports = DoctorListData;