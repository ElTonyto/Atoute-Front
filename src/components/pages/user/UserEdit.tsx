import React, { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UserNavigation from "./UserNavigation"
import "../../../assets/css/Edit.css"
import { editUserApi, getUserApi } from "./includes/userApi"

const UserEdit: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isParticular, setIsParticular] = useState<boolean>(true)
    const [civility, setCivility] = useState<string>("")
    const [companyName, setCompanyName] = useState<string>("")
    const [editSuccess, setEditSuccess] = useState<boolean>(false)
    const [warningMsg, setWarningMsg] = useState<string>("")

    useEffect(() => {
        const result = getUserApi()
        result.then(res => {
            if (res.success) {
                if (res.role === "particular") {
                    setIsParticular(true)
                    setCivility(res.civility)
                    console.log(civility)
                    setFirstName(res.firstName)
                    setLastName(res.lastName)
                }
                else {
                    setIsParticular(false)
                    setCompanyName(res.companyName)
                }
                setEmail(res.email)
            }
            else {
                setWarningMsg(res.message)
            }
        }).catch(err => {
            setWarningMsg(err.message)
        })
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setEditSuccess(false)
        setWarningMsg("")
        const result = editUserApi(isParticular, civility, companyName, firstName, lastName, password, confirmPassword)
        result.then(res => {
            if (res.success) {
                setEditSuccess(true)
                setWarningMsg(res.message)
                setFirstName(res.firstName)
                setLastName(res.lastName)
            }
            else {
                setWarningMsg(res.message)
            }
        }).catch(err => {
            setWarningMsg(err.message)
        })
    }

    const formRole = () => {
        if (isParticular) {
            if (civility.trim().length > 0) {
                return (
                    <form onSubmit={handleSubmit}>
                        <input className="form-edit-input form-edit-input-disable" type="email" placeholder="email" value={email} disabled />
                        <select defaultValue={civility} className="form-auth-input" onChange={e => { setCivility(e.target.value); setWarningMsg("") }}>
                            <option value="Mr">Monsieur</option>
                            <option value="Mme">Madame</option>
                        </select>
                        <input className="form-edit-input" type="text" placeholder="Prénom" value={firstName} onChange={e => { setFirstName(e.target.value); setWarningMsg("") }} />
                        <input className="form-edit-input" type="text" placeholder="Nom" value={lastName} onChange={e => { setLastName(e.target.value); setWarningMsg("") }} />
                        <input className="form-edit-input" type="password" placeholder="Mot de passe" value={password} onChange={e => { setPassword(e.target.value); setWarningMsg("") }} />
                        <input className="form-edit-input" type="password" placeholder="Confirmation de mot de passe" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setWarningMsg("") }} />
                        <button className="form-edit-submit" type="submit">Enregistrer</button>
                    </form>
                )
            }
        }
        return (
            <form onSubmit={handleSubmit}>
                <input className="form-edit-input form-edit-input-disable" type="email" placeholder="email" value={email} disabled />
                <input className="form-edit-input" type="text" placeholder="Nom de l'entreprise" value={companyName} onChange={e => { setCompanyName(e.target.value); setWarningMsg("") }} />
                <input className="form-edit-input" type="password" placeholder="Mot de passe" value={password} onChange={e => { setPassword(e.target.value); setWarningMsg("") }} />
                <input className="form-edit-input" type="password" placeholder="Confirmation de mot de passe" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setWarningMsg("") }} />
                <button className="form-edit-submit" type="submit">Enregistrer</button>
            </form>
        )
    }

    return (
        <div className="user-edit-page">
            <UserNavigation />

            <div className="form-edit">
                <h1>Edition de vos informations</h1>
                <div className="form-change-edit">
                    <Link to="/user" className="form-edit-link">Retour au profil</Link>
                </div>

                {formRole()}
                {warningMsg !== "" && <p className={`form-warning form-auth-${editSuccess ? "success" : "error"}`}>{warningMsg}</p>}
            </div>
        </div>
    )
}

export default UserEdit
