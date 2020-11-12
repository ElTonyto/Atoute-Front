import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import "../../../assets/css/Auth.css"
import { confirmAccount } from "../../../api/ApiRequest"

type Props = {
    match: any
}

const VerifyAccount: React.FC<Props> = ({ match }) => {
    const { token } = match.params
    let { id } = match.params
    id = Number(id)

    const [msg, setMsg] = useState<string>("")
    const [msgConfirmSuccess, setMsgConfirmSuccess] = useState<boolean>(false)
    const [warning, setWarning] = useState<boolean>(false)

    useEffect(() => {
        confirmAccount(id, token).then(res => {
            if (res.data.status === "success") {
                setMsgConfirmSuccess(true)
                setMsg("Votre compte a bien été confirmé")
            }
            else {
                setWarning(true)
                setMsg(res.data.message)
            }
        }).catch(err => {
            if (err.response.data.message === "user_not_found") {
                setWarning(true)
                setMsg("Le compte n'existe pas")
            }
            else {
                setWarning(true)
                setMsg(err.response.data.message)
            }
        })
    }, [])

    if (msg.length > 0) {
        return (
            <Redirect to={{
                pathname: "/login",
                state: { msg: msg, msgConfirmSuccess: msgConfirmSuccess, warning: warning }
            }}
            />
        )
    }
    return null
}

export default VerifyAccount
