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
    // getCookie(name) {
    //     var cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         var cookies = document.cookie.split(';');
    //         for (var i = 0; i < cookies.length; i++) {
    //             var cookie = cookies[i].trim();
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // }
    
    // csrftoken = this.getCookie('csrftoken');

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


    savePost = async(e) => {
        e.preventDefault()
        const currentUser = this.props.currentUser
        console.log(currentUser.id)
        const likedPost = await fetch (`${apiUrl}/api/posts/${this.props.post.id}/${currentUser.id}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        // window.location.href = `${window.location.origin}/api/posts/${this.props.post.id}`
        console.log(likedPost)
    }
    unsavePost = async(e) => {
        e.preventDefault()
        const currentUser = this.props.currentUser
        console.log(currentUser.id)
        const unlikedPost = await fetch (`${apiUrl}/api/posts/${this.props.post.id}/${currentUser.id}/unsave`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log(unlikedPost)
        // window.location.href = `${window.location.origin}/api/posts/${this.props.post.id}/unsave`
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
    // componentDidMount(){
    //     const csrftoken = getCookie('csrftoken');
    // }
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

            {/* <button id="post_id" onClick={this.savePost}>SAVE</button>
            <button onClick={this.unsavePost}>UNSAVE</button> */}

            <form onSubmit={this.savePost}>

            <button type="submit">LIKE</button>

            </form>

            <br/>
            <form onSubmit={this.unsavePost}>

            <button type="submit">UNLIKE</button>

            </form>
            <br/>
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