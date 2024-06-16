export type SignInEmailRequest = {
    email: string
    password: string
}

export type NotificationReadRequest = {
    id: string[]
}

export type ChangeUserInfoRequest = {
    id: string
    firstname: string
    lastname: string
    additionalname: string
    dolgnost: string
    phone: string
    email: string
}

export type ChangePasswordRequest = {
    id: string
    newPassword: string
    lastPaswword: string
}

export type ChangeUserPhotoRequest = {
    id: string
    photo: string
}

export type SignUpEmailRequest = {
    firstname: string
    lastname: string
    additionalname: string
    dolgnost: string
    orgname: string
    orgaddress: string
    phone: string
    email: string
}

export type ActivationRequest = {
    code: string
}

export type ForgotPasswordRequest = {
    email: string
}

export type ActivateNewPasswordRequest = {
    password: string
    email: string
}