import React, { FormEvent, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import "../../../assets/css/Auth.css"
import { registerApi } from "./includes/authApi"

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [role, setRole] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [civility, setCivility] = useState<string>("Mr")
    const [companyName, setCompanyName] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [registerSuccessed, setRegisterSuccessed] = useState<boolean>(false)
    const [warningMsg, setWarningMsg] = useState<string>("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const result = registerApi(email, password, confirmPassword, role, firstName, lastName, civility, companyName)
        result.then(res => {
            if (res.success) {
                setRegisterSuccessed(true)
            }
            else {
                setWarningMsg(res.message)
            }
        }).catch(err => {
            setWarningMsg(err.message)
        })
    }

    const onChangeRole = () => {
        if (role === "particular" || role === "") {
            return (
                <div className="form-auth-role-particular">
                    <select defaultValue={civility} className="form-auth-input" onChange={e => { setCivility(e.target.value); setWarningMsg("") }}>
                        <option value="Mr">Mr</option>
                        <option value="Mme">Mme</option>
                    </select>
                    <input className="form-auth-input" type="text" placeholder="Prénom" onChange={e => { setFirstName(e.target.value); setWarningMsg("") }} />
                    <input className="form-auth-input" type="text" placeholder="Nom" onChange={e => { setLastName(e.target.value); setWarningMsg("") }} />
                </div>
            )
        }
        return <input className="form-auth-input " type="text" placeholder="Nom de l'entreprise" onChange={e => { setCompanyName(e.target.value); setWarningMsg("") }} />
    }

    if (registerSuccessed) {
        return (
            <Redirect to={{
                pathname: "/login",
                state: { msg: "Un lien de confirmation vous a été envoyé par mail.", warning: false }
            }}
            />
        )
    }
    return (
        <div className="form-auth">
            <h1>Inscription</h1>
            <div className="form-change-auth">
                <p>Déjà inscrit ?</p>
                <Link to="/login" className="form-auth-link">Se connecter</Link>
            </div>

            <form onSubmit={handleSubmit}>
                <select defaultValue="" className="form-auth-input" onChange={e => { setRole(e.target.value); setWarningMsg("") }}>
                    <option value="" disabled hidden>Choisissez un rôle</option>
                    <option value="particular">Candidat</option>
                    <option value="company">Entreprise</option>
                </select>
                {onChangeRole()}
                <input className="form-auth-input" type="email" placeholder="Email" onChange={e => { setEmail(e.target.value); setWarningMsg("") }} />
                <input className="form-auth-input" type="password" placeholder="Mot de passe" onChange={e => { setPassword(e.target.value); setWarningMsg("") }} />
                <input className="form-auth-input" type="password" placeholder="Confirmer le mot de passe" onChange={e => { setConfirmPassword(e.target.value); setWarningMsg("") }} />
                <button className="form-auth-submit" type="submit">S'inscrire</button>
            </form>

            {warningMsg !== "" && <p className="form-warning form-auth-error">{warningMsg}</p>}
        </div>
    )
}

export default Register
