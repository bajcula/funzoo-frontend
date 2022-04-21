import React from "react";
import apiUrl from "../../../apiConfig";
import { Modal } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Navbar from "../../../Navbar/Navbar";
import FooterComp from "../../../FooterComp/FooterComp";
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

class OtherSinglePostContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            post: {},
            updatedPost: {},
            openModal: false,
            category: ""
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }
    updatePost = async(idToUpdate) => {
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
            this.setState({
                post: parsedResponse
            })
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
    savePost = async(e) => {
        e.preventDefault()
        const currentUser = this.props.currentUser
        console.log(currentUser.id)
        const likedPost = await fetch (`${apiUrl}/api/posts/${this.state.post.id}/${currentUser.id}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        // window.location.href = `${window.location.origin}/api/posts/${this.props.post.id}`
        if (likedPost.status === 200) {
            let newUsersLikedByArr = this.state.post.users_liked_by
            newUsersLikedByArr.push(currentUser.id)
            this.setState({
                post: {
                    ...this.state.post,
                    users_liked_by: newUsersLikedByArr
                }
            })
        }
        
    }
    unsavePost = async(e) => {
        e.preventDefault()
        const currentUser = this.props.currentUser
        console.log(currentUser.id)
        const unlikedPost = await fetch (`${apiUrl}/api/posts/${this.state.post.id}/${currentUser.id}/unsave`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (unlikedPost.status === 200) {
            let newUsersLikedByArr = this.state.post.users_liked_by
            newUsersLikedByArr.pop(currentUser.id)
            this.setState({
                post: {
                    ...this.state.post,
                    users_liked_by: newUsersLikedByArr
                }
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
    getPost = async() => {
        const getPostsApiReponse = await fetch(`${apiUrl}/api/posts/${this.props.id}`)
        const apiReponseParsed = await getPostsApiReponse.json()
        console.log(apiReponseParsed)
        this.setState({
            post: apiReponseParsed,
            updatedPost: apiReponseParsed
        })
        if (apiReponseParsed.pet_category === 'dog') {
            this.setState({
                category: 'dog'
            })
        } else if (apiReponseParsed.pet_category === 'cat') {
            this.setState({
                category: 'cat'
            })
        } else {
            this.setState({
                category: 'other'
            })
        }
    }
    componentDidMount(){
        this.getPost()
    }
    render(){
        return (
        <div className='single-post'>
            <Navbar></Navbar>
            <div className="single-post-div">
            <h2>{this.state.post.title}</h2>
            <img className="single-post-page-img" src={this.state.post.img}></img>
            <h3>{this.state.post.description}</h3>
            <p><b>Category:</b> {this.state.post.pet_category}</p>
            <p><b>Location:</b> {this.state.post.location}</p>
            <p><b>Created by:</b> {this.state.post.authorName}</p>
            <p><b>Date created:</b> {this.state.post.created_at?.slice(0,10)}</p>
            {this.props.currentUser?.id === this.state.post?.authorID?
            <>
            <Button onClick={()=>this.props.deletePost(this.state.post.id)} id='delete'>
                <label>DELETE</label>
                <DeleteForeverIcon id='delete-icon'  />
            </Button>
            <Button id='edit' onClick={this.handleOpen}>EDIT POST INFO</Button>
            </>
            :
            <>
            {this.state.post.users_liked_by?.includes(this.props.currentUser?.id)?
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
        <FooterComp></FooterComp>
        </div>
        )
    }
}

export default OtherSinglePostContainer