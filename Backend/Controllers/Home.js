const User = require('../Model/User-Schema')

const data = async (req, res) => {
    const response = req.user
    res.json(response)
}

module.exports = data