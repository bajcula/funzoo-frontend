import React from "react"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor(){
        super()
        this.state = {
            currentUser: {}
        }
    }
    getUser = () => {
        if(localStorage.getItem('user')) {
          const currentUser = localStorage.getItem('user')
          const currentUserParsed = JSON.parse(currentUser)
          // return email and id 
          return currentUserParsed
        }
        return false
      }
      logout = () => {
        localStorage.clear()
        this.setState({
          currentUser: {}
        })
        window.location.href = window.location.origin
      }
      componentDidMount(){
        const currentUser = this.getUser()
        if (currentUser) {
          this.setState({
            currentUser: currentUser
          })
        }
      }
    render(){
        return (
            <div className="navbar">
              <div className="banner-container">
              </div>
              <h2><span id="nav-span">FUNZ</span>&#9787;&#9787;</h2>
              {this.state.currentUser.name?
              <h3>Welcome {this.state.currentUser.name}</h3>
              :
              <h3>Please Sign In or Sign Up.</h3>
              }
              <div className="sign-in-out-div">
              {this.state.currentUser.email?
              <div id="nav-buttons">
                <Link className="link"  to='/home'><Button id="gallery-btn" className="glow-on-hover" variant="outlined">Gallery</Button></Link>
                <Link className="link"  to='/accounts'><Button id="community-btn" className="glow-on-hover" variant="outlined">Community</Button></Link>
                <Link className="link"  to={`/accounts/${this.state.currentUser.id}`}><Button id="myprofile-btn" className="glow-on-hover" variant="outlined">My profile</Button></Link>
                <Button className="glow-on-hover" id="sign-out-btn" onClick={this.logout}>Logout</Button>
              </div>
              :
              <div className="btn-holder">
              <Link className="link" to="/login"><Button className="glow-on-hover" id="sign-in-btn" variant="contained">Sign In</Button></Link>
              <Link className="link" to="/register"><Button className="glow-on-hover" id="sign-up-btn" variant="contained">Sign up</Button></Link>
              </div>
              }
              </div>
            </div>
        )
    }
}

export default Navbar