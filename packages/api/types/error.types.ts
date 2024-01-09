export class ServiceError extends Error {
    public error: PublicJsonError

    constructor(error: PublicJsonError) {
        super(error.message)
        this.error = error
    }
}

interface PublicJsonError {
    error: boolean
    message: string
    code: string
}

export const ERRORS = {
    SOMETHING_WENT_WRONG: {
        error: true,
        message: `Something went wrong :(`,
        code: 'entas_0000',
    },

    AUTH: {
        USERNAME_TAKEN: ({ username }: { username: string }) => {
            return {
                error: true,
                message: `Username "${username}" is already taken`,
                code: 'entas_auth_0001',
            }
        },

        EMAIL_TAKEN: ({ email }: { email: string }) => {
            return {
                error: true,
                message: `Email "${email}" is already taken`,
                code: 'entas_auth_0002',
            }
        },

        USER_NOT_FOUND_FROM_TOKEN_ID: {
            error: true,
            message: `User not found from token id`,
            code: 'entas_auth_0003',
        },

        USER_NOT_FOUND_FROM_USERNAME: {
            error: true,
            message: `User not found from username`,
            code: 'entas_auth_0004',
        },

        USER_NOT_FOUND_FROM_EMAIL: {
            error: true,
            message: `User not found from email`,
            code: 'entas_auth_0006',
        },

        PROVIDE_EMAIL_OR_USERNAME: {
            error: true,
            message: `Please provide either email or username`,
            code: 'entas_auth_0007',
        },
    },
}
