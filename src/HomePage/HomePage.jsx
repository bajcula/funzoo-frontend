import React from "react";
import FooterComp from "../FooterComp/FooterComp";
import Navbar from "../Navbar/Navbar";
import PostsContainer from "./PostsContainer/PostsContainer";

class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <div className="home-page-div">
                <Navbar></Navbar>
                <PostsContainer
                getUser={this.props.getUser}
                currentUser={this.props.currentUser}
                >
                </PostsContainer>
                <FooterComp></FooterComp>  
            </div>
        )
    }
}

export default HomePage