import React from "react";
import Navbar from "../Navbar/Navbar";
import PostsContainer from "./PostsContainer/PostsContainer";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <div>
                <Navbar></Navbar>
                <Link to="/login">Log In</Link>
                <br/>
                <br/>
                {this.props.currentUser.email !== ""?
                <p>logged in!</p>
                :

                <>
                <p>not logged in!</p>
                <Link to="/register">Register</Link>
                </>
                }
                <br/>
                <br/>
                <PostsContainer getUser={this.props.getUser} currentUser={this.props.currentUser}></PostsContainer>  
            </div>
        )
    }
}

export default HomePage