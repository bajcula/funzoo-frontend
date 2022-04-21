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