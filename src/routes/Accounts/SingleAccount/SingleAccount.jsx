import React from "react"
import { useParams } from "react-router-dom"


class SingleAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            thisUser: {},
            usersPosts: []
        }
    }
    componentDidMount() {
        this.getUserInfo(this.props.theID);
        this.getUsersPosts(this.props.theID)
    }
    getUserInfo = async(id) => {
        // const urlParams = new URLSearchParams(window.location.search);
        // const myParam = urlParams.get('myParam');
        // console.log(myParam)
        const apiResponse = await fetch(`http://localhost:8000/api/users/${id}`)
        const apiReponseParsed = await apiResponse.json()
        console.log(apiReponseParsed)
        this.setState({
            thisUser: apiReponseParsed
        })
    }
    getUsersPosts = async(id) => {
        const apiResponse = await fetch(`http://localhost:8000/api/posts/user/${id}`)
        const apiReponseParsed = await apiResponse.json()
        console.log(apiReponseParsed)
        this.setState({
            usersPosts: apiReponseParsed
        })
    }
    render() {
        return (
            <div>
            <h2>single account page of {this.state.thisUser.name}</h2>
            {this.state.usersPosts.map(p=>{
                return (
                    <div key={`users-post-${p.id}`}>
                        <p>{p.title}</p>
                        <img className="users-page-image" src={p.img}></img>
                    </div>
                )
            })}
            </div>
        )
    }
}

export default SingleAccount