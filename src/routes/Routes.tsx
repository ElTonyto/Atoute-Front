import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import Login from "../components/pages/auth/Login"
import Register from "../components/pages/auth/Register"
import { ResetPassword, ResetPasswordCheck } from "../components/pages/auth/ResetPassword"
import VerifyAccount from "../components/pages/auth/VerifyAccount"

import UserProfile from "../components/pages/user/UserProfile"
import UserEdit from "../components/pages/user/UserEdit"

const Routes: React.FC = () => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/confirmation/:id/:token" component={VerifyAccount} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/reset-password/:id/:token" component={ResetPasswordCheck} />

        <Route exact path="/user" component={UserProfile} />
        <Route exact path="/user/edit" component={UserEdit} />
    </Switch>
)

export default Routes
