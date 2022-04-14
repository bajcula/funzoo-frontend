import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import SingleAccount from "../SingleAccount/SingleAccount";

const UserCard = (props) => {
        return (
            <div className="user-card">
                <Link to={`/accounts/${props.user.id}`}><h3>{props.user.name}</h3></Link>
            </div>
        )
}

export default UserCard