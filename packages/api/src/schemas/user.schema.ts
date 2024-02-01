import { User } from '@prisma/client'

export type PublicUser = Pick<User, 'id' | 'username'>

export function parsePublicUser(user: User): PublicUser {
    return {
        id: user.id,
        username: user.username,
    }
}

export type MeUser = Pick<
    User,
    | 'id'
    | 'username'
    | 'name'
    | 'role'
    | 'email'
    | 'onboardingCompleted'
    | 'phoneNumber'
    | 'emailVerifiedAt'
>

export function parseMeUser(user: User): MeUser {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        email: user.email,
        onboardingCompleted: user.onboardingCompleted,
        phoneNumber: user.phoneNumber,
        emailVerifiedAt: user.emailVerifiedAt,
    }
}
