import multer from 'multer';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CourierClient } from '@trycourier/courier'
import { constStrings } from '../constants';

require('dotenv').config();

const senderEmail = process.env.EMAIL;
const secret = process.env.SECRET;
const passwd = process.env.EMAIL_PASSWORD
const eventId = process.env.COURIER_EVENT_ID
const recipientId = process.env.COURIER_RECIPIENT_ID
const authToken = process.env.AUTH_TOKEN
const mailTrapUser = process.env.MAIL_TRAP_USER
const mailTrapPassword = process.env.MAIL_TRAP_PASS
const hostUrl = process.env.HOST_URL

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
export const uploads = multer({ storage: storage })

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

export const generateToken = (payload, jwtSecret=secret) => {
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: '1hr'
    })
    return token;
}

export const verifyToken = (token, jwtSecret=secret) => {
    const decoded = jwt.verify(token, jwtSecret)
    return decoded
}

export const sendEmail = async (transport, emailData) => {
  try {
    const emailRes = await transport.sendMail({
        from: `"Smartract "<${senderEmail}>`, // sender address
        to: `${emailData.recipientEmail}`,
        subject: `${emailData.subject}`, // Subject line
        html: `${emailData.body}`
      });
  } catch (error) {
    console.log(JSON.parse(JSON.stringify(error)));
  }
}

export const transporter = () => nodemailer.createTransport({
//   host: 'gmail.com',
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: senderEmail,
//     pass: passwd
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: mailTrapUser,
    pass: mailTrapPassword
  }
});

export const composeVerificationMail = (emailData, mailType) => {
    
    const { recipientEmail, hashedSecret, userId, host, userFullName } = emailData
    
    switch (mailType) {
        case constStrings.verifyUser:
            return {
                recipientEmail: `${recipientEmail}`,
                subject: 'Email verification',
                body: `<div>
                  Hi ${userFullName} Thank you for signing up. <br/> Please click on the below link to activate your account.<br/>
                  <a href='${hostUrl}/api/v1/users/verifyUser?hashedSecret=${hashedSecret}&email=${recipientEmail}&id=${userId}'>Verify Your Email</a> <br/>
          
                  See you soon. Thank you.
                  </div>`
              };
        case constStrings.forgetPassword:
            return {
                recipientEmail: `${recipientEmail}`,
                subject: 'Password reset link',
                body: `<div>
                Hi ${email} Kindly click on the link below to reset your password.<br /><br/>
                <a href='${hostUrl}/api/v1/users/resetPassword/${userId}/${hashedSecret}'>Reset password</a> <br /> 
                </div>`
            }
        default:
            break;
    }

    
  }

  const courier = CourierClient({ authorizationToken: authToken });
//   courier.send({
//    eventId, // your Notification ID
//    recipientId, // usually your system's User ID
//    profile: {
//      email: "<EMAIL_ADDRESS>"
//    },
//    data: {} ,// optional variables for merging into templates 
//     }).then((resp) => {
//      console.log('Email sent', resp)
//    })
//    .catch((error) => {
//      console.error(error)
//    });

export const courierMailSender = (emailData) => courier.send({
    message: {
        to: [
            {
                user_id: "<USER_ID>", // usually your system's User ID associated to a Courier profile
                email: "test@email.com",
                data: {
                  name: "some user's name",
                },
              },
        ],
        tokk: {
            data: {
                name: 'emailData?.name'
            },
            email: emailData.recipientEmail
        },
        content: {
            ...emailData.content
        },
        routing: {
            method: "single",
            channels: ["email"],
        }
    }
})

export const sendMail = (emailData, mailType) => {
    
    const mailContent = composeVerificationMail(emailData, mailType )
    sendEmail(transporter(), mailContent)
}
