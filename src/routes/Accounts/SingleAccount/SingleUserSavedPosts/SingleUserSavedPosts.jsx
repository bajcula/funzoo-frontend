import React from "react"
import apiUrl from "../../../../apiConfig"

class SingleUserSavedPosts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            usersSavedPosts: []
        }
    }
    getUsersSavedPosts = async(id) => {
        const apiResponse = await fetch(`${apiUrl}/api/posts/user/${id}/saved`)
        const apiReponseParsed = await apiResponse.json()
        console.log(apiReponseParsed)
        this.setState({
            usersSavedPosts: apiReponseParsed
        })
    }
    componentDidMount(){
        this.getUsersSavedPosts(this.props.theID)
    }
    render(){
        return (
            <div>
                {this.state.usersSavedPosts.map(p=>{
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
            
        )
    }
}

export default SingleUserSavedPosts