import axios from "axios"
import { userToken, userRefreshToken, userAuth, userLogout } from "./auth"

const DEBUG = true
const HEADER_AUTH_TOKEN = "X-ATOUTE-AUTH-TOKEN"

axios.defaults.baseURL = "http://206.189.201.153:8080/"
axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.headers.common.Accept = "application/json"

const updateToken = async () => {
    const localRefreshToken = userRefreshToken()
    if (localRefreshToken === null || userRefreshToken.length === 0) {
        userLogout()
        // window.location.replace("/login")
    }

    let response = await axios({
        method: "post",
        url: "/auth/token/refresh",
        data: {
            refreshToken: localRefreshToken
        }
    })

    response = response.data

    const { accessToken, refreshToken } = response.data
    userAuth(accessToken, refreshToken)
    return accessToken
}

/* -------------------------
   ----- INTERCEPTORS ------
   ------------------------- */

// Request
axios.interceptors.request.use(
    config => {
        /** In dev, intercepts request and logs it into console for dev */
        config.headers[HEADER_AUTH_TOKEN] = userToken()

        if (DEBUG) {
            console.info("➡️ Request ✅", config)
        }
        return config
    },
    error => {
        if (DEBUG) {
            console.error("➡️ Request ️❌", error)
        }
        throw new Error(error)
    }
)

// Response
axios.interceptors.response.use(
    response => {
        if (DEBUG) {
            console.info("⬅️️ Response ✅", response)
        }

        if (response.data.message === "token_has_expired") {
            return updateToken().then(accessToken => {
                response.config.headers[HEADER_AUTH_TOKEN] = accessToken
                return axios.request(response.config)
            })
        }
        if (response.data.message === "invalid_credentials") {
            userLogout()
            // window.location.replace("/login")
        }

        if (response.data.status !== "success") throw response.data.message

        return response
    },
    error => {
        if (DEBUG) {
            console.info("⬅️️ Response ️❌", error)
        }
        throw new Error("undefined_error")
    }
)

export default axios
