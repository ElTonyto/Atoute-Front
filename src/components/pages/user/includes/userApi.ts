import { editUser, getUser } from "../../../../api/ApiRequest"

export const getUserApi = async () => {
    const result = {
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        civility: "",
        companyName: "",
        resumes: [],
        applications: [],
        success: false,
        message: ""
    }

    await getUser().then(res => {
        if (res.data.status === "success") {
            result.role = res.data.data.role
            result.civility = res.data.data.civility
            result.resumes = res.data.data.resumes
            result.applications = res.data.data.applications
            result.companyName = res.data.data.companyName
            result.firstName = res.data.data.firstName
            result.lastName = res.data.data.lastName
            result.email = res.data.data.email
            result.success = true
        }
        else {
            result.message = "Une erreur est survenue"
        }
        return result
    })
    return result
}

export const editUserApi = async (isParticular: boolean, civility: string, companyName: string, firstName: string, lastName: string, password: string, confirmPassword: string) => {
    const result = {
        civility,
        companyName,
        firstName,
        lastName,
        success: false,
        message: ""
    }

    if (password.trim().length > 0) {
        if (confirmPassword !== password) {
            result.message = "Le mot de passe doit être identique à la confirmation"
            return result
        }
    }

    if (confirmPassword.trim().length > 0 && password.trim().length === 0) {
        result.message = "Veuillez saisir un mot de passe"
        return result
    }

    if (isParticular) {
        if (civility.trim().length === 0) {
            result.message = "Veuillez saisir une civilité"
            return result
        }
        if (firstName.trim().length === 0) {
            result.message = "Veuillez saisir un prénom"
            return result
        }
        if (lastName.trim().length === 0) {
            result.message = "Veuillez saisir un nom"
            return result
        }
    }
    else {
        if (companyName.trim().length === 0) {
            result.message = "Veuillez saisir un nom d'entreprise"
            return result
        }
    }

    await editUser(civility, companyName, firstName, lastName, password).then(res => {
        if (res.data.status === "success") {
            result.success = true
            result.message = "Information enregistré"
        }
        else {
            result.message = "Une erreur est survenue"
        }
    })
    return result
}
