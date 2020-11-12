import axios from "./includes/axios"

export const login = (email : string, password: string) => axios.post("auth/login", { email, password })

export const register = (email : string, password: string, role: string, firstName: string, lastName: string, civility: string, companyName: string) => axios.post("auth/register", { email, role, password, firstName, lastName, civility, companyName })

export const resetPassword = (email : string) => axios.post("reset-password", { email })

export const resetPasswordCheck = (password : string, id: number, token: string) => axios.patch("reset-password/check", { password, id, token })

export const confirmAccount = (id: number, token : string) => axios.patch("auth/register/check", { id, token })

export const getUser = () => axios.get("user")

export const editUser = (civility: string, companyName: string, firstName: string, lastName: string, password: string) => axios.patch("user", { civility, companyName, firstName, lastName, password })
