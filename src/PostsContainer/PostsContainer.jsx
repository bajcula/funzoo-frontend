import React from "react";
import SinglePost from "./SinglePost/SinglePost";
import NewPost from "./NewPost/NewPost";

class PostsContainer extends React.Component {
    constructor(){
        super()
        this.state = {
            posts: [],
            newPost: {
                title: "",
                pet_category: "",
                description: "",
                location: "",
                img: "",
                user: "",
            }
        }
    }
    handleNewPostChange = (e) => {
        this.setState({
            newPost: {
                ...this.state.newPost,
                [e.target.name]: e.target.value
            }
        })
    }
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
    // CREATE NOT WORKING CORS PROBLEM ??!
    createNewPost = async(e) => {
        e.preventDefault()
        const createNewPostApiRequest = await fetch(`http://localhost:8000/api/posts/`, {
            method: "POST",
            body: JSON.stringify(this.state.newPost),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (createNewPostApiRequest.status === 201) {
            const createNewPostResponseParsed = await createNewPostApiRequest.json()
            console.log(createNewPostResponseParsed)
            this.setState({
                posts: [createNewPostResponseParsed, ...this.state.posts]
            })
        } else {
            // TELL USER THERE IS AN ERROR!
        }
    }
    async getPosts() {
        const getPostsApiReponse = await fetch(`http://localhost:8000/api/posts/`)
        const apiReponseParsed = await getPostsApiReponse.json()
        console.log(apiReponseParsed)
        this.setState({
            posts: apiReponseParsed
        })
    }
    deletePost = async(idToDelete) => {
        const deletePostApiRequest = await fetch(`http://localhost:8000/api/posts/${idToDelete}/`, {
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
    componentDidMount(){
        this.getPosts()
    }
    render () {
        return (
            <div>
                <h1>Animal pics (POSTS) container</h1>
                <NewPost
                handleRadioButtons={this.handleRadioButtons}
                createNewPost={this.createNewPost}
                handleNewPostChange={this.handleNewPostChange}
                >
                </NewPost>
                {this.state.posts.map((p)=>{
                    return (
                        <SinglePost deletePost={this.deletePost} key={`post-${p.id}`} post={p}></SinglePost>
                    )
                })}
            </div>
        )
    }
}

export default PostsContainer