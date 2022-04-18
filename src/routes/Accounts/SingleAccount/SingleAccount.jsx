import React from "react"
import apiUrl from "../../../apiConfig";
import { Link } from "react-router-dom";
import Navbar from "../../../Navbar/Navbar";
import axios from "axios";
import NewPost from "../../../HomePage/PostsContainer/NewPost/NewPost";
import { Button } from "@mui/material";

class SingleAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            pageUser: {},
            usersPosts: [],
            newPost: {
                title: "",
                pet_category: "",
                description: "",
                location: "",
                img: ""
            },
            showNewPost: false
        }
        this.toggleNewPostForm = this.toggleNewPostForm.bind(this)
    }
    componentDidMount() {
        this.getUserInfo(this.props.theID);
        this.getUsersPosts(this.props.theID)
        this.setState({
            currentUser: this.props.currentUser
        })
    }
    getUserInfo = async(id) => {

        const apiResponse = await fetch(`${apiUrl}/api/users/${id}`)
        const apiReponseParsed = await apiResponse.json()

        this.setState({
            pageUser: apiReponseParsed
        })
    }
    toggleNewPostForm () {
        this.setState({
            showNewPost: !this.state.showNewPost
        })
    }
    getUsersPosts = async(id) => {
        const apiResponse = await fetch(`http://localhost:8000/api/posts/user/${id}`)
        const apiReponseParsed = await apiResponse.json()

        this.setState({
            usersPosts: apiReponseParsed
        })
    }
    createNewPost = async(e) => {
        e.preventDefault()
        let form_data = new FormData();
        form_data.append('title', this.state.newPost.title)
        form_data.append('pet_category', this.state.newPost.pet_category)
        form_data.append('description', this.state.newPost.description)
        form_data.append('location', this.state.newPost.location)
        form_data.append('img', this.state.newPost.img)
        form_data.append('authorID', this.state.currentUser.id)
        form_data.append('authorName', this.state.currentUser.name)
        const submitedPost = await axios.post(`${apiUrl}/api/posts/`, form_data, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        if (submitedPost.status === 201) {
            submitedPost.data.img = submitedPost.data.img.replace("http://localhost:8000/media/", "");
            this.setState({
                usersPosts: [submitedPost.data, ...this.state.usersPosts],
                showNewPost: false
            })
        } else {
            // TELL USER THERE IS AN ERROR!
        }
    }
    handleNewPostChange = (e) => {
        this.setState({
            newPost: {
                ...this.state.newPost,
                [e.target.name]: e.target.value,
            }
        })
    }
    handleImageChange = (e) => {
        this.setState({
            newPost: {
                ...this.state.newPost,
                img: e.target.files[0]
            }
        })
    };
    handleRadioButtons = (e) => {
        if (['dog','cat','other'].includes(e.target.id)) {
            this.setState({
                newPost: {
                    ...this.state.newPost,
                    pet_category: e.target.id
                }
            })
        }
    }
    render() {
        return (
            <>
            <Navbar></Navbar>
            <div className="single-account">
            <h2>single account page of {this.state.pageUser.name}</h2>
            <Link className="link" to={`/accounts/${this.state.pageUser.id}/saved`}>
                <Button id='saved-link-btn'>
                    {this.props.theID == this.props.currentUser.id?
                    <p>Check out my favorite posts</p>
                    :       
                    <p>Click HERE to check out <br/> {this.state.pageUser.name}'s saved posts</p>
                    }
                </Button>
            </Link>





            {this.props.theID == this.state.currentUser?.id &&
            <div className="add-new">
            {this.state.showNewPost?
                <NewPost
                handleRadioButtons={this.handleRadioButtons}
                createNewPost={this.createNewPost}
                handleNewPostChange={this.handleNewPostChange}
                handleImageChange={this.handleImageChange}
                >
                </NewPost>
            :
            <div>
                <p className="add-new-para">They make us angry, they make us laugh! Share your funniest pet pictures with the world!</p>
                <Button
                onClick={this.toggleNewPostForm}
                className="glow-on-hover"
                id="add-new-btn"
                variant="contained"
                >
                ADD NEW POST
                </Button>
            </div>
            }
            </div>
            }


            {this.state.usersPosts.map(p=>{
                return (
                    <a key={`users-post-${p.id}`} href={`${window.location.origin}/posts/${p.id}`}>
                    <div >
                       <p>{p.title}</p>
                        <img className="users-page-image" src={`${apiUrl}/media/${p.img}`}></img>
                    </div>
                    </a>
                )
            })}
            </div>
            </>
        )
    }
}

export default SingleAccount