import React from "react";
import apiUrl from "../../apiConfig";
import Navbar from "../../Navbar/Navbar";
import { Button } from "@mui/material";
import FooterComp from "../../FooterComp/FooterComp";

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
                    {this.props.currentUser?.email !== "" ?
                    <>
                        <p>You are logged in already.</p>
                        <Button id='log-out-btn' className="glow-on-hover" onClick={this.logout}>Logout</Button>
                    </>
                    :
                    <form className="login-form" onSubmit={this.loginTry}>
                        <div>
                            <label htmlFor="email">EMAIL:</label>
                            <input onChange={this.handleLoginChange} id='email' name="email"></input>
                        </div>
                        <div>
                            <label htmlFor="password">PASSWORD:</label>
                            <input onChange={this.handleLoginChange} type='password' id='password' name="password"></input>
                        </div>
                        <Button type='submit' id='log-in-btn' className="glow-on-hover">Log In</Button>
                    </form>
                    }
                </div>
                <FooterComp></FooterComp>
            </div>
        )
    }
}

export default Login