import React from "react";
import { Link } from "react-router-dom";

const UserCard = (props) => {
        return (
            <div className="user-card">
                <Link className="link" to={`/accounts/${props.user.id}`}>
                    <h3 className="purple">name: {props.user.name}</h3>
                    <h5 className="black">email: {props.user.email}</h5>
                    <p className="black">click to see profile</p>
                </Link>
            </div>
        )
}

export default UserCard