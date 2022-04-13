import './App.css';
import {Link} from 'react-router-dom';
import PostsContainer from './HomePage/PostsContainer/PostsContainer';
import Navbar from './Navbar/Navbar';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import HomePage from './HomePage/HomePage';

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
      </Routes>
    </BrowserRouter>
        
      </div>
    );
  } 
}

export default App;
