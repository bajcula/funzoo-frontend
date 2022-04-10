import React from "react";
import SinglePost from "./SinglePost/SinglePost";

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
                created_at: ""
            }
        }
    }
    handleNewPostChange(e){
        
    }
    async getPosts() {
        const getPostsApiReponse = await fetch(`http://localhost:8000/api/posts`)
        const apiReponseParsed = await getPostsApiReponse.json()
        console.log(apiReponseParsed)
        this.setState({
            posts: apiReponseParsed
        })
    }
    componentDidMount(){
        this.getPosts()
    }
    render () {
        return (
            <div>
                <h1>Animal pics (POSTS) container</h1>
                {this.state.posts.map((p)=>{
                    return (
                        <SinglePost key={`post-${p.id}`} post={p}></SinglePost>
                    )
                })}
                <h1>HIII</h1>
            </div>
        )
    }
}

export default PostsContainer