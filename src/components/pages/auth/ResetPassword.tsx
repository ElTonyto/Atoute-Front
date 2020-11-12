import React, { FormEvent, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import "../../../assets/css/Auth.css"
import { resetPasswordApi, resetPasswordCheckApi } from "./includes/authApi"

export const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [msg, setMsg] = useState<string>("")
    const [warningMsg, setWarningMsg] = useState<boolean>(false)

    const resetPasswordHandleSubmit = (e: FormEvent) => {
        setWarningMsg(false)
        setMsg("")
        e.preventDefault()
        const result = resetPasswordApi(email)
        result.then(res => {
            if (res.success) {
                setWarningMsg(true)
            }
            setMsg(res.message)
        }).catch(err => {
            setWarningMsg(err.success)
            setMsg(err.message)
        })
    }

    return (
        <div className="form-auth">
            <h1>Mot de passe oublié</h1>

            <div className="form-change-auth">
                <p>Après avoir complété ce formulaire, vous recevrez un lien par e-mail vous permettant de choisir votre nouveau mot de passe.</p>
            </div>

            <form onSubmit={resetPasswordHandleSubmit}>
                <input className="form-auth-input" type="email" placeholder="Email" onChange={e => { setEmail(e.target.value); setWarningMsg(false); setMsg("") }} />
                <Link to="/login" className="form-auth-forget-password">retour</Link>
                <button className="form-auth-submit" type="submit">Valider</button>
            </form>

            {msg !== "" && <p className={`form-warning form-auth-${warningMsg ? "success" : "error"}`}>{msg}</p>}
        </div>
    )
}

type Props = {
    match: any
}

export const ResetPasswordCheck: React.FC<Props> = ({ match }) => {
    const { token } = match.params
    let { id } = match.params
    id = Number(id)

    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setpasswordConfirm] = useState<string>("")
    const [msg, setMsg] = useState<string>("")
    const [warningMsg, setWarningMsg] = useState<boolean>(false)

    const resetPasswordCheckHandleSubmit = (e: FormEvent) => {
        setWarningMsg(false)
        setMsg("")
        e.preventDefault()
        const result = resetPasswordCheckApi(password, passwordConfirm, id, token)
        result.then(res => {
            if (res.success) {
                setWarningMsg(true)
            }
            setMsg(res.message)
        }).catch(err => {
            setWarningMsg(err.success)
            setMsg(err.message)
        })
    }

    if (warningMsg) {
        return (
            <Redirect to={{
                pathname: "/login",
                state: { msg: "Mot de passe modifié", msgConfirmSuccess: true, warning: false }
            }}
            />
        )
    }
    return (
        <div className="form-auth">
            <h1>Réinitialiser mon mot de passe</h1>

            <form onSubmit={resetPasswordCheckHandleSubmit}>
                <input className="form-auth-input" type="password" placeholder="Nouveau mot de passe" onChange={e => { setPassword(e.target.value); setWarningMsg(false); setMsg("") }} />
                <input className="form-auth-input" type="password" placeholder="Confirmer le mot de passe" onChange={e => { setpasswordConfirm(e.target.value); setWarningMsg(false); setMsg("") }} />
                <button className="form-auth-submit" type="submit">Valider</button>
            </form>

            {msg !== "" && <p className="form-warning form-auth-error">{msg}</p>}
        </div>
    )
}
