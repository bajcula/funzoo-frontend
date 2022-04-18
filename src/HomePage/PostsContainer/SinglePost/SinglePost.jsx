import React from "react";
import apiUrl from "../../../apiConfig";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
                authorID: this.props.post.authorID,
                authorName: this.props.post.authorName,
                created_at: this.props.post.created_at,
                users_liked_by: this.props.post.users_liked_by
            },
            openModal: false,
            category: ""
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }
    componentDidMount(){
        if (this.props.post.pet_category === 'dog') {
            this.setState({
                category: 'dog'
            })
        } else if (this.props.post.pet_category === 'cat') {
            this.setState({
                category: 'cat'
            })
        } else {
            this.setState({
                category: 'other'
            })
        }
    }
    handleOpen (){
        this.setState({
            openModal: true
        })
    }
    handleClose (){
        this.setState({
            openModal: false
        })
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
        // const postToSend = {
        //     ...this.state.updatedPost,
        // }
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
        this.handleClose()
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
        const likedPost = await fetch (`${apiUrl}/api/posts/${this.props.post.id}/${currentUser.id}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        // window.location.href = `${window.location.origin}/api/posts/${this.props.post.id}`
        if(likedPost.status == 200) {
            // this.props.handler(parsedResponse, this.props.post.id)
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
        if(unlikedPost.status == 200) {
            // this.props.handler(parsedResponse, this.props.post.id)
            let newUsersLikedByArr = this.props.post.users_liked_by
            newUsersLikedByArr.pop(currentUser.id)
            let newUpdatedPost = {
                ...this.props.post,
                users_liked_by: newUsersLikedByArr
            }
            this.props.handler(newUpdatedPost, this.props.post.id)
        }
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
            <a href={`${window.location.origin}/posts/${this.props.post.id}`}><h3>{this.props.post.title}</h3></a>
            <img className="single-post-img" src={this.props.post.img}></img>
            <h6>{this.props.post.description}</h6>
            <p>Category: {this.props.post.pet_category}</p>
            <p>Location: {this.props.post.location}</p>
            <p>Created by: {this.props.post.authorName}</p>
            <p>Cretated at: {this.props.post.created_at}</p>
            {this.props.currentUser.id == this.props.post.authorID?
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





            
            
            {this.props.currentUser.id == this.props.post.authorID &&
                <Button onClick={this.handleOpen}>EDIT</Button>
            }   
            
            <Modal
            open={this.state.openModal}
            onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box className="edit-modal" sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                EDIT POST
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div>
            <form onSubmit={(e)=>{e.preventDefault(); this.updatePost(this.state.updatedPost.id)}}>
                <div className="form-row">
                    <label htmlFor="title">Title:</label>
                    <input onChange={this.handleUpdatePostChange} name="title" value={this.state.updatedPost.title}></input>
                </div>
                <div className="form-row">
                    <label htmlFor="description">Description:</label>
                    <input onChange={this.handleUpdatePostChange} name="description" value={this.state.updatedPost.description}></input>
                </div>

                <div className="form-row-category">
                        <label htmlFor="pet_category">Category:</label>
                        {['dog', 'cat', 'other'].map((option) => (
                            <div key={`inline-radio-div-${option}`} className="mb-3">
                                {this.state.category === option?
                                <Form.Check
                                    defaultChecked
                                    inline
                                    onClick={this.handleRadioButtons}
                                    label={option}
                                    name='name'
                                    type={"radio"}
                                    id={`${option}`}
                                />
                                :
                                <Form.Check
                                    inline
                                    onClick={this.handleRadioButtons}
                                    label={option}
                                    name='name'
                                    type={"radio"}
                                    id={`${option}`}
                                />    
                                }
                                {/* <Form.Check
                                    inline
                                    onClick={props.handleRadioButtons}
                                    label={option}
                                    name='name'
                                    type={"radio"}
                                    id={`${option}`}
                                /> */}
                            </div>
                        ))}
                </div>
                <div className="form-row">
                    <label htmlFor="location">Location:</label>
                    <input onChange={this.handleUpdatePostChange} name="location" value={this.state.updatedPost.location}></input>
                </div>
                <button type="submit">SUBMIT</button>
            </form>
        </div>
                </Typography>
            </Box>
            </Modal>
        </div>
        )
    }
}

export default SinglePost