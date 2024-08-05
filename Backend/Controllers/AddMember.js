const Doctor = require('../Model/Doctor-Schema')
const statusCode = require('http-status-codes')
const sendEmail = require('./email');

const AddMember = async (req, res) => {
    const data = req.body
    try {
        const response = await Doctor.create(data)
        await sendEmail(
            data.email,
            'Welcome to Our Medical Community!',
            `Dear ${data.firstName} ${data.lastName},

                    We are delighted to welcome you as a new member of our esteemed medical community at D&D! Your profile has been successfully created, and we are excited to have you on board.

                    Here are your membership details:
                    
                    Name: ${data.firstName} ${data.lastName}
                    Email: ${data.email}
                    Specialization: ${data.specialization}
                    Contact Number: ${data.contactNumber}
                    Available Hours: ${data.availableHours}
                    Languages Spoken: ${data.languageSpoken}
                    Address: ${data.address}
                    If you have any questions or need assistance, please feel free to reach out to us at izunair38@gmail.com.
                    
                    Thank you for joining us, and we look forward to your valuable contributions to our community.
                    
                    Warm regards,
                    
                    Team D&D`
        );
        res.status(statusCode.CREATED).json(response)
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:error + "Opps sorry"})
    }
}

module.exports = AddMember