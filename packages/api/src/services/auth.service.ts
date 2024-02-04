import { User, UserRole } from '@prisma/client'
import { createUser } from './user.service'
import { sign, verify } from 'hono/jwt'
import { ENV } from '../env'
import { prisma } from '../../prisma/client'
import { ERRORS, ServiceError } from '../../types/error.types'
import { verifyPassword } from '../helpers/password.helper'
import { sendEmail } from '../helpers/email.helper'
import { getVerifyEmailHtml } from '../emails/VerifyEmail'

export async function signup({
    username,
    email,
    password,
}: {
    username: string
    email: string
    password: string
}): Promise<{ user: User; token: string }> {
    const user = await createUser({
        username,
        email,
        password,
    })

    const token = await createTokenForUser(user)

    return {
        user,
        token,
    }
}

export async function login({
    username,
    email,
    password,
}: {
    username: string | null
    email: string | null
    password: string
}): Promise<{ user: User; token: string }> {
    if (username === null && email === null) {
        throw new ServiceError(ERRORS.AUTH.PROVIDE_EMAIL_OR_USERNAME)
    }

    let user: User | null = null

    if (username !== null) {
        user = await prisma.user.findUnique({
            where: {
                username,
            },
        })
        if (!user) {
            throw new ServiceError(ERRORS.AUTH.USER_NOT_FOUND_FROM_USERNAME)
        }
    } else if (email !== null) {
        user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (!user) {
            throw new ServiceError(ERRORS.AUTH.USER_NOT_FOUND_FROM_EMAIL)
        }
    }

    if (!user) {
        throw new ServiceError(ERRORS.SOMETHING_WENT_WRONG)
    }

    const isPasswordValid = await verifyPassword(password, user.password)

    if (isPasswordValid === false) {
        throw new ServiceError(ERRORS.AUTH.USER_NOT_FOUND_FROM_USERNAME)
    }

    const token = await createTokenForUser(user)

    return { user, token }
}

export async function sendVerificationEmail(user: User): Promise<void> {
    const payload = {
        userId: user.id,
        verifyEmail: true,
    }

    const token = await sign(payload, ENV.JWT_SECRET)

    const verificationUrl = `${ENV.WEB_URL}/verify-email?token=${token}`

    const html = getVerifyEmailHtml({
        name: 'Johannes',
        verificationUrl,
    })

    await sendEmail({
        to: user.email,
        subject: 'Verify your email',
        html,
        text: `Click this link to verify your email ${verificationUrl}`,
    })
}

export async function verifyEmail(token: string): Promise<User> {
    const payload = await verify(token, ENV.JWT_SECRET)
    if (!payload.verifyEmail) {
        throw new ServiceError(ERRORS.AUTH.INVALID_VERIFY_EMAIL_TOKEN)
    }

    const user = await prisma.user.findUnique({
        where: {
            id: payload.userId,
        },
    })

    if (!user) {
        throw new ServiceError(ERRORS.AUTH.USER_NOT_FOUND_FROM_TOKEN_ID)
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            emailVerifiedAt: new Date(),
        },
    })

    return updatedUser
}

/*
HELPERS
*/

async function createTokenForUser(user: User): Promise<string> {
    const payload: TokenPayload = {
        userId: user.id,
        userRole: user.role,
    }
    const token = await sign(payload, ENV.JWT_SECRET)

    return token
}

async function getUserFromToken(token: string): Promise<User> {
    const payload = (await verify(token, ENV.JWT_SECRET)) as TokenPayload

    const user = await prisma.user.findUnique({
        where: {
            id: payload.userId,
        },
    })

    if (!user) {
        throw new ServiceError(ERRORS.AUTH.USER_NOT_FOUND_FROM_TOKEN_ID)
    }

    return user
}

interface TokenPayload {
    userId: string
    userRole: UserRole
}
