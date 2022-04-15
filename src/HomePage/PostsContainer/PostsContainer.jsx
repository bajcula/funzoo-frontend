import React from "react";
import SinglePost from "./SinglePost/SinglePost";
import NewPost from "./NewPost/NewPost";
import axios from 'axios';
import apiUrl from "../../apiConfig";


class PostsContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            newPost: {
                title: "",
                pet_category: "",
                description: "",
                location: "",
                img: ""
            },
            currentUser: { }
        }
        this.handler = this.handler.bind(this)
    }
    componentDidMount(){
        this.getPosts()
        const currentUser = this.props.getUser()
        if (currentUser) {
            this.setState({
                currentUser: currentUser
            })
        }
        this.setState({
            currentUser: currentUser,
        })
    }
    handler(newUpdatedPost, idToUpdate) {
        this.setState({
            posts: this.state.posts.map(p=> p.id === idToUpdate ? newUpdatedPost : p)
        })
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
    createNewPost = async(e) => {
        e.preventDefault()
        let form_data = new FormData();
        form_data.append('title', this.state.newPost.title)
        form_data.append('pet_category', this.state.newPost.pet_category)
        form_data.append('description', this.state.newPost.description)
        form_data.append('location', this.state.newPost.location)
        form_data.append('img', this.state.newPost.img)
        form_data.append('authorID', this.props.currentUser.id)
        form_data.append('authorName', this.props.currentUser.name)
        console.log(form_data)

        const submitedPost = await axios.post(`${apiUrl}/api/posts/`, form_data, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        console.log(submitedPost)
        if (submitedPost.status === 201) {
            this.setState({
                posts: [submitedPost.data, ...this.state.posts]
            })
        } else {
            // TELL USER THERE IS AN ERROR!
        }
    }

    deletePost = async(idToDelete) => {
        const deletePostApiRequest = await fetch(`${apiUrl}/api/posts/${idToDelete}/`, {
            method: "DELETE",
        })
        if (deletePostApiRequest.status === 204) {
            this.setState({
                posts: this.state.posts.filter(p => p.id !== idToDelete)
            })
        } else {
            // HANDLE DELETE ERROR
        }
    }
    async getPosts() {
        const getPostsApiReponse = await fetch(`${apiUrl}/api/posts/`)
        const apiReponseParsed = await getPostsApiReponse.json()
        console.log(apiReponseParsed)
        this.setState({
            posts: apiReponseParsed
        })
    }

   
    render () {
        return (
            <div>
                <h1>Animal pics (POSTS) container</h1>
                <NewPost
                handleRadioButtons={this.handleRadioButtons}
                createNewPost={this.createNewPost}
                handleNewPostChange={this.handleNewPostChange}
                handleImageChange={this.handleImageChange}
                >
                </NewPost>
                {this.state.posts.map((p)=>{
                    return (
                        <SinglePost handler={this.handler} updatePost={this.updatePost} deletePost={this.deletePost} key={`post-${p.id}`} post={p}></SinglePost>
                    )
                })}
            </div>
        )
    }
}

export default PostsContainer