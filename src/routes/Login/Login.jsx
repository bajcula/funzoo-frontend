import React from "react";
import apiUrl from "../../apiConfig";
import Navbar from "../../Navbar/Navbar";
import { Button } from "@mui/material";

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = ({
            possibleUser: {
                email: "",
                password: ""
            }
        })
    }
    currentUser = localStorage.getItem("user")
    handleLoginChange = (e) => {
        e.preventDefault()
        this.setState({
            possibleUser: {
                ...this.state.possibleUser,
                [e.target.name]: e.target.value
            }
        })
    }
    loginTry = async(e) => {
        e.preventDefault()
        const apiResponse = await fetch (`${apiUrl}/auth/login/`, {
            method: "POST",
            body: JSON.stringify(this.state.possibleUser),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json()
        console.log(parsedResponse)
        if (parsedResponse.user) {
            localStorage.setItem("user", JSON.stringify(parsedResponse.user))
            window.location.href = window.location.origin
        } else {
            // LOGIN ERROR
            window.location.reload()
        }
        
    }
    logout = () => {
        localStorage.clear()
        window.location.href = window.location.origin
    }
    render() {
        return (
            <div className="login-page">
                <Navbar></Navbar>
                <div className="login-page-div">
                    {this.props.currentUser.email?
                    <>
                        <p>USER LOGGED IN</p>
                        <Button className="glow-on-hover" onClick={this.logout}>Logout</Button>
                    </>
                        :
                    <form onSubmit={this.loginTry}>
                        <br/>
                        <br/>
                        email:<input onChange={this.handleLoginChange} name="email"></input>
                        <br/>
                        <br/>
                        password:<input onChange={this.handleLoginChange} name="password"></input>
                        <br/>
                        <Button className="glow-on-hover">Log In</Button>
                    </form>
                    }
                </div>
            </div>
        )
    }
}

export default Login