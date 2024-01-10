import './globals.css'
import { Josefin_Sans } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Josefin_Sans({
    subsets: ['latin'],
    display: 'swap',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.className}>
            <body>{children}</body>
        </html>
    )
}
