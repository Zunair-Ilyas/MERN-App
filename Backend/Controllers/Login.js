const User = require('../Model/User-Schema')
const jwt = require('jsonwebtoken')
const statusCode = require('http-status-codes')

const login = async (req, res) => {
    const {email, _id, firstName, lastName} = req.user
    try {
        const user = await User.findOne({ email: email, _id: _id })
        if (user) {
            jwt.sign({firstName:firstName, lastName:lastName, email:email}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) {return res.status(statusCode.BAD_REQUEST).json({message:"Invalid token"});}
                return res.status(statusCode.OK).json({
                    message:"Login successful",
                    token: token,
                    user:user});
            })
        }
    } catch (e) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error: e});
    }
}

module.exports = login