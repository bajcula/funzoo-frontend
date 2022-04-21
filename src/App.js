import './App.css';
import PostsContainer from './HomePage/PostsContainer/PostsContainer';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import HomePage from './HomePage/HomePage';
import Accounts from './routes/Accounts/Accounts';
import GetID from './helper/GetID';
import GetIDforSavedPosts from './helper/GetIDforSavedPosts';
import GetIDforSinglePost from './helper/GetIDforSinglePost';
import LandingPage from './LandingPage/LandingPage';
import apiUrl from './apiConfig';

class App extends React.Component {
  constructor(props) {
    super(props)
    // make a state for storing user
    this.state = ({
      currentUser: {
        email: "",
        id: ""
      },
      posts: []
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
  getPosts = async() => {
    const getPostsApiReponse = await fetch(`${apiUrl}/api/posts/`)
    const apiReponseParsed = await getPostsApiReponse.json()
    console.log(apiReponseParsed)
    this.shufflePosts(apiReponseParsed)
    this.setState({
        posts: apiReponseParsed
    })
  }
  shufflePosts(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  
  componentDidMount(){
    const currentUser = this.getUser()
    if (currentUser) {
      this.setState({
        currentUser: currentUser
      })
    }
    this.getPosts()
  }
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="" element={<LandingPage posts={this.state.posts} name='home' getUser={this.getUser} currentUser={this.state.currentUser} />} />
            <Route path="login" element={<Login currentUser={this.state.currentUser} />} />
            <Route path="register" element={<Register />} />
            <Route path="home" element={<HomePage name='home' getUser={this.getUser} currentUser={this.state.currentUser} />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="accounts/:id/saved" element={ <GetIDforSavedPosts currentUser={this.state.currentUser} />} /> 
            <Route path="accounts/:id" element={<GetID currentUser={this.state.currentUser}/>} />
            <Route path="posts" element={<PostsContainer getUser={this.getUser} />} />
            <Route path="posts/:id" element={<GetIDforSinglePost user={this.state.currentUser} />} />
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
