import React, { FormEvent, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import UserNavigation from "../user/UserNavigation"
import "../../../assets/css/Auth.css"
import "../../../assets/css/Form.css"

type Props = {
    location: any
}

const Login: React.FC<Props> = ({ location }) => {
    const [title, setTitle] = useState<string>("")

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loginSuccessed, setLoginSuccessed] = useState<boolean>(false)
    const [warningMsg, setWarningMsg] = useState<string>("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <div id="create-offer-page">
            <UserNavigation />
            <div className="form">

                <h1>Créer une nouvelle offre</h1>
                {/* <div className="form-change-offer">
                    <p>Pas encore de compte ? </p>
                    <Link to="/register" className="form-offer-link">S'inscrire</Link>
                </div> */}

                <form onSubmit={handleSubmit}>
                    <input className="form-input offer" type="text" placeholder="Titre" onChange={e => { setTitle(e.target.value) }} />
                    <input className="form-input offer" type="text" placeholder="Description" />
                    <input className="form-input offer" type="text" placeholder="Date début" />
                    <input className="form-input offer" type="text" placeholder="Date fin" />
                    <input className="form-input offer" type="text" placeholder="Salaire" />
                    <input className="form-input offer" type="text" placeholder="Secteur d'activité" />
                    <input className="form-input offer" type="text" placeholder="Type de contrat" />
                    <input className="form-input offer" type="text" placeholder="Code postal" />
                    <input className="form-input offer" type="text" placeholder="Ville" />

                    <button className="form-submit offer" type="submit">Créer</button>
                </form>
            </div>
        </div>
    )
}

export default Login
