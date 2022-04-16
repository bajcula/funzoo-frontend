import './App.css';
import {Link} from 'react-router-dom';
import PostsContainer from './HomePage/PostsContainer/PostsContainer';
import Navbar from './Navbar/Navbar';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import HomePage from './HomePage/HomePage';
import Accounts from './routes/Accounts/Accounts';
import SingleAccount from './routes/Accounts/SingleAccount/SingleAccount';
import GetID from './helper/GetID';
import SingleUserSavedPosts from './routes/Accounts/SingleAccount/SingleUserSavedPosts/SingleUserSavedPosts';
import GetIDforSavedPosts from './helper/GetIDforSavedPosts';


class App extends React.Component {
  constructor(props) {
    super(props)
    // make a state for storing user
    this.state = ({
      currentUser: {
        email: "",
        id: ""
      }
    })
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
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="" element={<HomePage name='home' getUser={this.getUser} currentUser={this.state.currentUser} />} />
            <Route path="login" element={<Login  />} />
            <Route path="register" element={<Register />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path={`accounts/:id/saved`} element={ <GetIDforSavedPosts />} /> 
            <Route path={`accounts/:id`} element={<GetID />} />

            
            {/* <Route path="posts" element={<Posts />} /> */}
            <Route
            path="*"
            element={
            <main style={{ padding: "6rem", fontSize: "2rem" }}>
              <p>There's nothing here!</p>
            </main>
            }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } 
}

export default App;
