import nodemailer from 'nodemailer'
import { ENV } from '../env'

export async function sendEmail(email: string, subject: string, html: string) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.forwardemail.net',
        port: 587,
        secure: false,
        auth: {
            user: 'noreply@entas.cc',
            pass: ENV.SMTP_PASSWORD,
        },
    })

    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <noreply@entas.cc>', // sender address
        to: 'johannes@krabbe.dev', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
    })

    return info
}
