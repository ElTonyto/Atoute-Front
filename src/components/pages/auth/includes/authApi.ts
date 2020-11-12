import { login, register, resetPassword, resetPasswordCheck } from "../../../../api/ApiRequest"
import { userAuth } from "../../../../api/includes/auth"

const result = {
    message: "",
    success: false
}

export const loginApi = async (email: string, password: string) => {
    result.success = false
    if (email.trim().length === 0) {
        result.message = "Veuillez saisir un email"
        return result
    }

    if (password.trim().length === 0) {
        result.message = "Veuillez saisir un mot de passe"
        return result
    }

    await login(email, password).then(res => {
        if (res.data.status === "success") {
            const { accessToken, refreshToken } = res.data.data.accessToken
            userAuth(accessToken, refreshToken)
            result.success = true
        }
        else {
            if (res.data.message === "invalid_credentials") {
                result.message = "Email ou mot de passe incorrect"
            }
            if (res.data.message === "user_not_verified") {
                result.message = "Votre compte n'a pas été confirmé"
            }
            else {
                result.message = "Une erreur est survenue"
            }
        }
    }).catch(err => {
        if (err === "user_not_verified") {
            result.message = "Votre compte n'a pas été confirmé"
        }
        if (err === "invalid_credentials") {
            result.message = "Email ou mot de passe incorrect"
        }
        else {
            result.message = "Une erreur est survenue"
        }
    })
    return result
}

export const registerApi = async (email: string, password: string, confirmPassword: string, role: string, firstName: string, lastName: string, civility: string, companyName: string) => {
    result.success = false
    if (role.trim() === "") {
        result.message = "Veuillez choisir un rôle"
        return result
    }

    if (role === "particular") {
        if (firstName.trim().length === 0) {
            result.message = "Veuillez saisir prénom"
            return result
        }
        if (lastName.trim().length === 0) {
            result.message = "Veuillez saisir nom"
            return result
        }
    }
    else {
        if (companyName.trim().length === 0) {
            result.message = "Veuillez saisir un nom d'entreprise"
        }
        return result
    }

    if (email.trim().length === 0) {
        result.message = "Veuillez saisir un email"
        return result
    }

    if (password.trim().length === 0) {
        result.message = "Veuillez saisir un mot de passe"
        return result
    }

    if (password !== confirmPassword) {
        result.message = "Le mot de passe doit être identique à la confirmation"
        return result
    }

    await register(email, password, role, firstName, lastName, civility, companyName).then(res => {
        if (res.data.status === "success") {
            result.success = true
        }
        else {
            if (res.data.message === "email_already_exists") {
                result.message = "L'email est déjà utilisé"
            }
            else {
                result.message = "Une erreur est survenue"
            }
        }
    }).catch(err => {
        if (err === "email_already_exists") {
            result.message = "L'email est déjà utilisé"
        }
        else {
            result.message = "Une erreur est survenue"
        }
    })
    return result
}

export const resetPasswordApi = async (email: string) => {
    result.success = false
    if (email.trim().length === 0) {
        result.message = "Veuillez saisir un email"
        return result
    }

    await resetPassword(email).then(res => {
        if (res.data.status === "success") {
            result.success = true
            result.message = "Un lien vous a été envoyé par mail."
        }
        else {
            if (res.data.message === "user_not_found") {
                result.message = "Aucun compte associé à cette email"
            }
            else {
                result.message = "Une erreur est survenue"
            }
        }
    }).catch(err => {
        if (err === "user_not_found" || "undefined_error") {
            result.message = "Aucun compte associé à cette email"
        }
        else {
            result.message = "Une erreur est survenue"
        }
    })
    return result
}

export const resetPasswordCheckApi = async (password: string, confirmPassword: string, id: number, token: string) => {
    result.success = false
    if (password.trim().length === 0) {
        result.message = "Veuillez saisir un mot de passe"
        return result
    }

    if (password !== confirmPassword) {
        result.message = "Le mot de passe doit être identique à la confirmation"
        return result
    }

    await resetPasswordCheck(password, id, token).then(res => {
        if (res.data.status === "success") {
            result.success = true
        }
        else {
            if (res.data.message === "invalid_token") {
                result.message = "Lien expiré"
            }
            else {
                result.message = "Une erreur est survenue"
            }
        }
    }).catch(err => {
        if (err === "invalid_token" || err === "undefined_error") {
            result.message = "Lien expiré"
        }
        else {
            result.message = "Une erreur est survenue"
        }
    })
    return result
}
