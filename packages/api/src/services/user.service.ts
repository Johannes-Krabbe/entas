import { User } from '@prisma/client'
import { ERRORS, ServiceError } from '../../types/error.types'
import { prisma } from '../../prisma/client'
import { hashPassword } from '../helpers/password.helper'

export async function createUser({
    username,
    email,
    password,
}: {
    username: string
    email: string
    password: string
}): Promise<User> {
    // Check if username is taken
    if (
        await prisma.user.findUnique({
            where: {
                username,
            },
        })
    ) {
        throw new ServiceError(ERRORS.AUTH.USERNAME_TAKEN({ username }))
    }

    // Check if email is taken
    if (
        await prisma.user.findUnique({
            where: {
                email,
            },
        })
    ) {
        throw new ServiceError(ERRORS.AUTH.EMAIL_TAKEN({ email }))
    }

    // Create user
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    })

    return user
}
