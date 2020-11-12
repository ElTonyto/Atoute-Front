import React, { FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import "../../../assets/css/User.css"

const UserNavigation: React.FC = () => (
    <section id="sidebar">
        <div id="sidebar-nav">
            <ul>
                <li><Link to="/user">Profil</Link></li>
                <li><Link to="/user/candidatures">Candidatures</Link></li>
            </ul>
        </div>
    </section>
)

export default UserNavigation
