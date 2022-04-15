import React from "react"

class Navbar extends React.Component {
    constructor(){
        super()
        this.state = {
            currentUser: {}
        }
    }
    getUser = () => {
        if(localStorage.getItem('user')) {
          const currentUser = localStorage.getItem('user')
          const currentUserParsed = JSON.parse(currentUser)
          // return email and id 
          return currentUserParsed
        }
        return false
      }
      componentDidMount(){
        const currentUser = this.getUser()
        if (currentUser) {
          this.setState({
            currentUser: currentUser
          })
        }
      }
    render(){
        return (
            <div className="navbar">
                <h2>Hello, this is FUNZOO</h2>
                <p>This is the nav bar!</p>
                {this.state.currentUser.name?
                <p>Welcome {this.state.currentUser.name}</p>
                :
                <p>Please Log In or Sign Up.</p>
                }
            </div>
        )
    }
}

export default Navbar