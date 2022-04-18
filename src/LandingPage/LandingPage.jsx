import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import FooterComp from "../FooterComp/FooterComp";
import { Button } from "@mui/material";

class LandingPage extends React.Component {
    constructor(props){
        super(props)
    }
    logout = () => {
        localStorage.clear()
        window.location.href = window.location.origin
    }
    render (){
        return (
            <div className="landing-page">
                <Navbar></Navbar>
                {/* <div className="sing-in-out-div">
                {this.props.currentUser.email !== ""?
                <div>
                <Button className="glow-on-hover" id="sign-out-btn" onClick={this.logout}>Logout</Button>
                </div>
                :
                <div className="btn-holder">
                <Link className="link" to="/login"><Button className="glow-on-hover" id="sign-in-btn" variant="contained">Sign In</Button></Link>
                <Link className="link" to="/register"><Button className="glow-on-hover" id="sign-up-btn" variant="contained">Sign up</Button></Link>
                </div>
                }
                </div>
                <div className="landing-page-div">   
                <Link className="link"  to='/accounts'><Button id="community-btn" className="glow-on-hover" variant="outlined">Community</Button></Link>
                <Link className="link"  to='/home'><Button id="community-btn" className="glow-on-hover" variant="outlined">Gallery</Button></Link>

                </div> */}
                {this.props.posts[2] &&
                <div className="landing-page-img-div">
                    <img className="landing-img" src={this.props.posts[0].img}></img>
                    <img className="landing-img" src={this.props.posts[1].img}></img>
                    <img className="landing-img" src={this.props.posts[2].img}></img>
                </div>
                 }
                <FooterComp></FooterComp>
            </div>
        )
    }
}

export default LandingPage