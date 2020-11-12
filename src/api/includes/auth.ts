export const checkUserAuth = () => sessionStorage.getItem("accessToken") !== null

export const userToken = () => sessionStorage.getItem("accessToken")

export const userRefreshToken = () => sessionStorage.getItem("refreshToken")

export const userLogout = () => sessionStorage.clear()

export const userAuth = (accessToken: string, refreshToken: string) => {
    sessionStorage.setItem("accessToken", accessToken)
    sessionStorage.setItem("refreshToken", refreshToken)
}
