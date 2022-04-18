import { useNavigate, useParams } from "react-router-dom";
import apiUrl from "../apiConfig";
import { useState, useEffect } from "react";
import UpdatePost from "../HomePage/PostsContainer/SinglePost/UpdatePost/UpdatePost";

function GetIDforUpdateSinglePost(props) {
    const navigate = useNavigate()
    const { id } = useParams();
    const [post, setPost] = useState({})
    const [updatedPost, setUpdatedPost] = useState({})
    const getPost = async() => {
        const getPostsApiReponse = await fetch(`${apiUrl}/api/posts/${id}`)
        const apiReponseParsed = await getPostsApiReponse.json()
        setPost(apiReponseParsed)
        setUpdatedPost(apiReponseParsed)
    }
    const handleUpdatePostChange = (e) => {
        e.preventDefault()
        setUpdatedPost ({
            ...updatedPost,
            [e.target.name]: e.target.value
        })
    }
    const handlerButtons = (choice) => {
        setUpdatedPost({
                ...updatedPost,
                pet_category: choice
        })
    }
    const handleRadioButtons = (e) => {
        if (['dog','cat','other'].includes(e.target.id)) {
            handlerButtons(e.target.id)
        }
    }
    const updatePostFunc = async(idToUpdate) => {
        console.log(updatedPost)
        const updatePostApiReponse = await fetch(`${apiUrl}/api/posts/${idToUpdate}/`, {
            method: "PUT",
            body: JSON.stringify(updatedPost),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(updatePostApiReponse.status)
        if (updatePostApiReponse.status === 200) {
            const parsedResponse = await updatePostApiReponse.json()
            navigate('/')
            // handler(parsedResponse, post.id)
        } else {
            // HANDLE ERROR MESSAGE
        }
    }

    useEffect(()=>{
        getPost()
    }, [])
    return (
        <div>
                <UpdatePost
                updatePostFunc={updatePostFunc}
                handleUpdatePostChange={handleUpdatePostChange}
                handleRadioButtons={handleRadioButtons}
                currentUser={props.currentUser} post={post} updatedPost={updatedPost}/>
        </div>
    );
  }
  export default GetIDforUpdateSinglePost;