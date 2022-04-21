import React from "react";
import apiUrl from "../../apiConfig";
import Navbar from "../../Navbar/Navbar";
import FooterComp from "../../FooterComp/FooterComp";
import Button from '@mui/material/Button';

class Register extends React.Component {
    constructor(){
        super()
        this.state = {
            newUser: {
                email: "",
                password1: "",
                password2: '',
                name: ""
            }
        }
    }
    handleNewUserChange = (e) => {
        this.setState({
            newUser: {
                ...this.state.newUser,
                [e.target.name]: e.target.value
            }
        })
    }
    createNewUser = async(e) => {
        e.preventDefault()
        const theUserToSend = {
            email: this.state.newUser.email,
            name: this.state.newUser.name,
            password: this.state.newUser.password2
        }        
        console.log(theUserToSend)
        const createNewUserApiReq = await fetch(`${apiUrl}/api/users/`, {
            method: "POST",
            body: JSON.stringify(theUserToSend),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(createNewUserApiReq)
        if (createNewUserApiReq.status === 201) {
            window.location.href = `${window.location.origin}/login`
        } else {
            // HANDLE ERROR
        }
    }
    render() {
        return (
            <div className="register-page">
                <Navbar></Navbar>
                <div className="register-page-div">
                <form className="register-form" onSubmit={this.createNewUser} encType='multipart/form'>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input onChange={this.handleNewUserChange} name="email"></input>
                    </div>
                    <div>
                        <label htmlFor="name">Full name:</label>
                        <input onChange={this.handleNewUserChange} name="name"></input>
                    </div>
                    <div>
                        <label htmlFor="password1">Password:</label>
                        <input onChange={this.handleNewUserChange} name="password1"></input>
                    </div>
                    <div>
                        <label htmlFor="password2">Confirm password:</label>
                        <input onChange={this.handleNewUserChange} name="password2"></input>
                    </div>

                <Button size="small" variant="contained" id="create-btn" type="submit" >CREATE PROFILE</Button>

                </form>
                </div>
                <FooterComp></FooterComp>
            </div>
        )
    }
}

export default Register