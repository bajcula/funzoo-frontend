import React from "react"
import apiUrl from "../../../../apiConfig"
import FooterComp from "../../../../FooterComp/FooterComp"
import Navbar from "../../../../Navbar/Navbar"

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
            <div className="saved-posts">
                <Navbar></Navbar>
                {this.state.usersSavedPosts.length === 0 &&
                <h3 className="purple">This user has not saved any posts yet.</h3>
                }
                {this.state.usersSavedPosts.map(p=>{
                    return (
                        <a key={`users-post-${p.id}`} href={`${window.location.origin}/posts/${p.id}`}>
                            <div >
                                <p>{p.title}</p>
                                <img className="users-page-image" src={p.img}></img>
                            </div>
                        </a>
                    )
                })}
                <FooterComp></FooterComp>
            </div>
            
        )
    }
}

export default SingleUserSavedPosts