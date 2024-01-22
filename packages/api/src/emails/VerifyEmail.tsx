import * as React from 'react'
import { Html, Button, Head, Preview, Body } from '@react-email/components'

export function Email(props: { url: string }) {
    const { url } = props

    return (
        <Html lang="en">
            <Head />
            <Preview>AWS Email Verification</Preview>
            <Body style={main}>
                <Button href={url}>Click me</Button>
            </Body>
        </Html>
    )
}

const main = {
    backgroundColor: '#fff',
    color: '#212121',
}
