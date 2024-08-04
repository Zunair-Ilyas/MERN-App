const DoctorCategory = require('../Model/Doctor-Category-Schema')
const statusCodes = require('http-status-codes')

const CategoriesData = async (req, res) => {
    const {search} = req.query
    const queryObject = {}

    if (search) {
        queryObject.categoryName = {$regex: search, $options: 'i'};
    }
    try {
        const Data = await DoctorCategory.find(queryObject)
        res.status(statusCodes.OK).json(Data)
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
}

module.exports = CategoriesData;