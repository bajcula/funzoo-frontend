import React from "react";
import UserCard from "./UserCard/UserCard";
import Navbar from "../../Navbar/Navbar";
import apiUrl from "../../apiConfig";

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
            <div>
                <Navbar></Navbar>
                <h1>Welcome to the FUNZOO community!</h1>
                {/* {this.state.users !== [] && */}
                {this.state.users.map(u=>{
                    return (
                        <UserCard key={`user-${u.id}`} user={u}></UserCard>
                    )
                })}
            </div>
        )
    }
}

export default Accounts