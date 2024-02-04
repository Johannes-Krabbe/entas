import nodemailer from 'nodemailer'
import { ENV } from '../env'

export async function sendEmail({
    to,
    subject,
    text,
    html,
}: {
    to: string
    subject: string
    text?: string
    html: string
}) {
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
        to,
        subject,
        text:
            text ??
            'Could not render HTML, please enable HTML in your email client or use a different one.',
        html,
    })
    console.log(info)

    return info
}
