import React from "react";
import UserCard from "./UserCard/UserCard";
import Navbar from "../../Navbar/Navbar";
import apiUrl from "../../apiConfig";
import FooterComp from "../../FooterComp/FooterComp";

class Accounts extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            change: false
        }
    }
    async getAllUsers() {
        const getUsersApiReponse = await fetch(`${apiUrl}/api/users/`)
        const apiReponseParsed = await getUsersApiReponse.json()
        
        this.setState({
            users: apiReponseParsed,
            change: !this.state.change
        })
    }
    componentDidMount(){
        this.getAllUsers()
    }
    // IF THERE IS TIME MAKE SOME KINF OF ANIMATION WHEN ENTERING THE PAGE
    render(){
        return (
            <div className="accounts-page">
                <Navbar></Navbar>
                <div className="accounts-page-div">
                    <h4 className="community-head">We are proud to have {this.state.users.length} members of the FUNZOO FAMILY already.</h4>
                    <ul>
                    {this.state.users.map(u=>{
                        return (
                            <li key={`user-${u.id}`}><UserCard  user={u}></UserCard></li>
                        )
                    })}
                    </ul>
                </div>
                <FooterComp></FooterComp>
            </div>
        )
    }
}

export default Accounts