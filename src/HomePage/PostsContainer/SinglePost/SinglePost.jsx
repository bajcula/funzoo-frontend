import React from "react";
import apiUrl from "../../../apiConfig";
import UpdatePost from "./UpdatePost/UpdatePost";

class SinglePost extends React.Component {
    constructor(props){
        super(props)
        this.updatePost = this.updatePost.bind(this);
        this.handlerButtons = this.handlerButtons.bind(this)
        this.state = {
            updatedPost: {
                id: this.props.post.id,
                title: this.props.post.title,
                pet_category: this.props.post.pet_category,
                description: this.props.post.description,
                location: this.props.post.location,
                img: this.props.post.img,
                authorID: this.props.post.authorID,
                authorName: this.props.post.authorName,
                created_at: this.props.post.created_at
            }
        }
    }
    updatePost = async(idToUpdate) => {
        console.log(this.state.updatedPost)
        const updatePostApiReponse = await fetch(`${apiUrl}/api/posts/${idToUpdate}/`, {
            method: "PUT",
            body: JSON.stringify(this.state.updatedPost),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(updatePostApiReponse.status)
        if (updatePostApiReponse.status === 200) {
            const parsedResponse = await updatePostApiReponse.json()
            this.props.handler(parsedResponse, this.props.post.id)
        } else {
            // HANDLE ERROR MESSAGE
        }
    }
    handleUpdatePostChange = (e) => {
        this.setState({
            updatedPost: {
                ...this.state.updatedPost,
                [e.target.name]: e.target.value
            }
        })
    }
    handlerButtons = (choice) => {
        this.setState({
            updatedPost: {
                ...this.state.updatedPost,
                pet_category: choice
            }
        })
    }
    handleRadioButtons = (e) => {
        if (['dog','cat','other'].includes(e.target.id)) {
            this.handlerButtons(e.target.id)
        }
    }
    render(){
        return (
        <div id='single-post'>
            <h3>{this.props.post.title}</h3>
            <img className="single-post-img" src={this.props.post.img}></img>
            <h6>{this.props.post.description}</h6>
            <p>Category: {this.props.post.pet_category}</p>
            <p>Location: {this.props.post.location}</p>
            <p>Created by: {this.props.post.authorName}</p>
            <p>Cretated at: {this.props.post.created_at}</p>
            <button onClick={()=>this.props.deletePost(this.props.post.id)}>DELETE POST</button>
            <UpdatePost
            handler={this.props.handler}
            updatePost={this.updatePost}
            handleRadioButtons={this.handleRadioButtons}
            handleUpdatePostChange={this.handleUpdatePostChange}
            updatedPost={this.state.updatedPost}
            >
            </UpdatePost>
        </div>
        )
    }
}

export default SinglePost