export interface LoginCredentials {
    email: string,
    password: string,
}

export interface RegisterCredentials {
    username: string,
    email: string,
    password: string,
}

export interface ResetPasswordRequest {
    email: string
}

export interface ResetToken{
    token: string
}

export interface VerifyToken{
    token: string
}

export interface PasswordReset{
    token: string,
    password: string
}