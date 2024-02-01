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

    const info = await transporter.sendMail({
        from: 'Entas 👾" <noreply@entas.cc>',
        to: email,
        subject: subject,
        text: 'Could not render HTML',
        html,
    })
    console.log(info)

    return info
}
