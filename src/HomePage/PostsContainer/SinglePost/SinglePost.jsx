import React from "react";
import apiUrl from "../../../apiConfig";
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

class SinglePost extends React.Component {
    savePost = async(e) => {
        e.preventDefault()
        const currentUser = this.props.currentUser
        const likedPost = await fetch (`${apiUrl}/api/posts/${this.props.post.id}/${currentUser.id}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if(likedPost.status === 200) {
            let newUsersLikedByArr = this.props.post.users_liked_by
            newUsersLikedByArr.push(currentUser.id)
            let newUpdatedPost = {
                ...this.props.post,
                users_liked_by: newUsersLikedByArr
            }
            this.props.handler(newUpdatedPost, this.props.post.id)
        }
    }

    unsavePost = async(e) => {
        e.preventDefault()
        const currentUser = this.props.currentUser
        const unlikedPost = await fetch (`${apiUrl}/api/posts/${this.props.post.id}/${currentUser.id}/unsave`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if(unlikedPost.status === 200) {
            // this.props.handler(parsedResponse, this.props.post.id)
            let newUsersLikedByArr = this.props.post.users_liked_by
            newUsersLikedByArr.pop(currentUser.id)
            let newUpdatedPost = {
                ...this.props.post,
                users_liked_by: newUsersLikedByArr
            }
            this.props.handler(newUpdatedPost, this.props.post.id)
        }
    }
 
    render(){
        return (
        <div id='single-post'>
            <a href={`${window.location.origin}/posts/${this.props.post.id}`}><h2>{this.props.post.title}</h2></a>
            <img className="single-post-img" src={this.props.post.img}></img>
            <h3>{this.props.post.description}</h3>
            <p><b>Category:</b> {this.props.post.pet_category}</p>
            <p><b>Location:</b> {this.props.post.location}</p>
            <p><b>Created by:</b> {this.props.post.authorName}</p>
            <p><b>Date created:</b> {this.props.post.created_at.slice(0,10)}</p>
            {this.props.currentUser.id === this.props.post.authorID?
            <Button className="single-card-btn">
                <label>UNLIKE</label>
                <DeleteForeverIcon id='delete-icon' onClick={()=>this.props.deletePost(this.props.post.id)} />
            </Button>
            :
            <>
            {this.props.post.users_liked_by?.includes(this.props.currentUser?.id)?
            <Button onClick={this.unsavePost} id="like">
                <label>UNLIKE</label>
                <RemoveCircleIcon id='unlike-icon'  />
            </Button>
            :
            <Button onClick={this.savePost} id="unlike">
                <label>LIKE</label>
                <FavoriteIcon id='like-icon'  />
            </Button>
            }
            </>
            }              
            {this.props.currentUser.id === this.props.post.authorID &&
                <Button onClick={this.handleOpen}>EDIT</Button>
            }   
        </div>
        )
    }
}

export default SinglePost