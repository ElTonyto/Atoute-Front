import React, { FormEvent, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import "../../../assets/css/Auth.css"
import { loginApi } from "./includes/authApi"

type Props = {
    location: any
}

const Login: React.FC<Props> = ({ location }) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loginSuccessed, setLoginSuccessed] = useState<boolean>(false)
    const [warningMsg, setWarningMsg] = useState<string>("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        location.state = undefined
        const result = loginApi(email, password)
        result.then(res => {
            if (res.success) {
                setLoginSuccessed(true)
            }
            else {
                setWarningMsg(res.message)
            }
        }).catch(err => {
            setWarningMsg(err.message)
        })
    }

    const confirmEmailMsg = () => {
        if (location.state !== undefined) {
            if (location.state.msgConfirmSuccess) {
                return <p className="form-warning form-auth-success">{location.state.msg}</p>
            }
            if (location.state.warning) {
                return <p className="form-warning form-auth-error">{location.state.msg}</p>
            }
            return <p className="form-warning form-auth-warning">{location.state.msg}</p>
        }
        return null
    }

    if (loginSuccessed) {
        return <Redirect to="/user" />
    }

    return (
        <div className="form-auth">
            <h1>Connexion</h1>
            <div className="form-change-auth">
                <p>Pas encore de compte ? </p>
                <Link to="/register" className="form-auth-link">S'inscrire</Link>
            </div>

            <form onSubmit={handleSubmit}>
                <input className="form-auth-input" type="email" placeholder="Email" onChange={e => { setEmail(e.target.value); setWarningMsg(""); location.state = undefined }} />
                <input className="form-auth-input" type="password" placeholder="Mot de passe" onChange={e => { setPassword(e.target.value); setWarningMsg(""); location.state = undefined }} />
                <Link to="/reset-password" className="form-auth-forget-password">Mot de passe oublié</Link>
                <button className="form-auth-submit" type="submit">Se connecter</button>
            </form>

            {warningMsg !== "" && <p className="form-warning form-auth-error">{warningMsg}</p>}
            {confirmEmailMsg()}
        </div>
    )
}

export default Login
