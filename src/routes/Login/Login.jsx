import React from "react";
import Navbar from "../../Navbar/Navbar";

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
        console.time('loop')
        const apiResponse = await fetch (`http://localhost:8000/auth/login/`, {
            method: "POST",
            body: JSON.stringify(this.state.possibleUser),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json()
        console.log(parsedResponse)
        console.timeEnd('loop')
        if (parsedResponse.user) {
            localStorage.setItem("user", JSON.stringify(parsedResponse.user))
            window.location.reload()
        } else {
            // LOGIN ERROR
            window.location.reload()
        }
        
    }
    logout = () => {
        localStorage.clear()
        window.location.reload()
    }
    render() {
        return (
            <div className="login-page">
                <Navbar></Navbar>
                <div>
                    <form onSubmit={this.loginTry}>
                        <br/>
                        <br/>
                        email:<input onChange={this.handleLoginChange} name="email"></input>
                        <br/>
                        <br/>
                        password:<input onChange={this.handleLoginChange} name="password"></input>
                        <button>Log In</button>
                    </form>
                    {this.currentUser?
                        <p>USER LOGGED IN</p>
                        :
                        <p>still anonymus</p>
                    }
                    <button onClick={this.logout}>Logout</button>
                </div>
            </div>
        )
    }
}

export default Login