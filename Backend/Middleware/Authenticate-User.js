const UserSchema = require('../Model/User-Schema')
const statusCode = require('http-status-codes')
const bcrypt = require('bcryptjs')

const AuthenticateUser = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const user = await UserSchema.findOne({email: email})
        if (user && bcrypt.compareSync(password, user.password)) {
            req.user = user
            next()
        } else {
            return res.status(statusCode.BAD_REQUEST).json({message:"Invalid email or password"});
        }
    } catch (e) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"});
    }
}

module.exports = AuthenticateUser