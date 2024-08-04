const Appointment = require('../Model/Appointment')
const sendEmail = require('./email');

const CreateAppointment = async (req, res) => {
    const data = req.body
    try {
        const appointment = await Appointment.create(data)
        await sendEmail(
            data.email,
            'Appointment Confirmation',
            `
                    Dear ${data.firstName} ${data.lastName},
                    
                    We are pleased to confirm your appointment with Dr. ${data.doctor_name}.
                    
                    Here are the details of your appointment:
                    
                    - Date: ${data.appointmentDate}
                    - Time: ${data.appointmentTime}
                    - Doctor's Name: Dr. ${data.doctor_name}
                    - Specialization: ${data.doctor_specialization}
                    - Address: ${data.doctor_address}
                    - Contact: ${data.doctor_contact}
                    
                    If you need to reschedule or have any questions, please contact us at izunair38@gmail.com.
                    
                    Thank you,
                    Team D&D
        `
        );

        await sendEmail(
            data.doctor_email,
            'New Appointment Scheduled',
            `
                Dear Dr. ${data.doctor_name},
                
                A new appointment has been scheduled with you. Here are the details:
                
                - Patient's Name: ${data.firstName} ${data.lastName}
                - Date: ${data.appointmentDate}
                - Time: ${data.appointmentTime}
                - Patient's Email: ${data.email}
                - Patient's Contact Number: ${data.contactNumber}
                - Patient's Address: ${data.address}
                
                Please be prepared for the appointment. If you have any questions or need to reschedule, please contact us at izunair38@gmail.com.
                
                Thank you,
                Team D&D
                        `
        )

        res.status(201).json(appointment)
    } catch (e) {
        res.status(400).send({error:e})
    }
}

module.exports = CreateAppointment;