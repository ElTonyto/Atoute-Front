import React, { FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import UserNavigation from "./UserNavigation"
import { getUserApi } from "./includes/userApi"

const UserProfile: React.FC = () => {
    // const firstName ="John"
    // const lastName = "Doe"
    // const email = "johndoe@test.t"

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [warningMsg, setWarningMsg] = useState<string>("")

    const result = getUserApi()
    result.then(res => {
        setFirstName("Non renseigné")
        setLastName("Non renseigné")
        setEmail(res.email)
    })

    console.log(result)

    // setWarningMsg("error")

    return (
        <div id="user-profile-page">
            <UserNavigation />
            <section className="user-profile-content">

                <div className="content-header">
                    <h1>{firstName} {lastName}</h1>
                    <p>Bienvenu sur votre profil.</p>
                </div>
                <div className="content-data">
                    <table>
                        <tr>
                            <th>Nom:</th>
                            <td>{firstName}</td>
                        </tr>
                        <tr>
                            <th>Prénom:</th>
                            <td>{lastName}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{email}</td>
                        </tr>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default UserProfile
