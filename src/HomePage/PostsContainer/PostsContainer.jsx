import React from "react";
import SinglePost from "./SinglePost/SinglePost";
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
            currentUser: {}
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
                <h4 className="purple home-title">We are proud to present you our pets gallery!</h4>
                {this.state.posts.filter(p=>p.authorID !== this.props.currentUser.id).map((p)=>{
                        return (
                            <SinglePost
                            currentUser={this.state.currentUser}
                            handler={this.handler}
                            key={`post-${p.id}`}
                            post={p}
                            > 
                            </SinglePost>
                        )
                })}
            </div>
        )
    }
}

export default PostsContainer