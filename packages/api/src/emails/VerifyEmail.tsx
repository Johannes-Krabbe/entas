import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Button,
    Text,
    render,
} from '@react-email/components'

interface VerifyEmailProps {
    name: string
    verificationUrl: string
}

export default function VerifyEmail({
    name,
    verificationUrl,
}: VerifyEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Please Verify Your Email Address</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={upperSection}>
                        <Heading style={h1}>Hi, {name}👋!</Heading>
                        <Text style={text}>
                            Welcome to <b>ENTAS</b>🚀! We're excited to have you
                            on board. Before you dive in, we need to verify your
                            email address to ensure that we have the correct
                            details for your account.
                        </Text>
                        <Text style={text}>
                            Please click the link below to verify your email
                            address:
                        </Text>
                        <Section style={verificationSection}>
                            <Button
                                href={verificationUrl}
                                style={{
                                    color: '#fff',
                                    backgroundColor: '#333',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    fontSize: '20px',
                                    fontFamily,
                                }}
                            >
                                Verify My Email
                            </Button>
                        </Section>
                        <Text style={text}>
                            This link will expire in 24 hours. If you did not
                            sign up for ENTAS, please ignore this email.
                        </Text>
                        <Text style={text}>
                            Thank you for joining ENTAS. We look forward to
                            having you with us.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

const fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"

const main = {
    backgroundColor: '#fff',
    color: '#212121',
}

const container = {
    padding: '0px',
    margin: '0 auto',
}

const h1 = {
    color: '#333',
    fontFamily,
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '15px',
    textAlign: 'center' as const,
}

const text = {
    color: '#333',
    fontFamily,
    fontSize: '16px',
    margin: '24px 0',
    textAlign: 'center' as const,
}

const upperSection = { padding: '25px 35px' }

const verificationSection = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

VerifyEmail.PreviewProps = {
    name: 'John',
    verificationUrl: 'https://example.com',
} as VerifyEmailProps

export const getVerifyEmailHtml = (data: VerifyEmailProps) =>
    render(<VerifyEmail {...data} />)
