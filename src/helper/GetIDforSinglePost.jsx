import { useNavigate, useParams } from "react-router-dom";
import OtherSinglePostContainer from "../HomePage/PostsContainer/SinglePost/OtherSinglePostContainer";
import apiUrl from "../apiConfig";
import { useState} from "react";

function GetIDforSinglePost(props) {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const { id } = useParams();
    const deletePost = async(idToDelete) => {
        const deletePostApiRequest = await fetch(`${apiUrl}/api/posts/${idToDelete}/`, {
            method: "DELETE",
        })
        if (deletePostApiRequest.status === 204) {
            setPosts(
                posts.filter(p => p.id !== idToDelete)
            )
            navigate(`/accounts/${props.user.id}`)            
        } else {
            // HANDLE DELETE ERROR
        }
    }
    return (
        <div>
            <OtherSinglePostContainer
            currentUser={props.user} // GOT
            // handler={handler}
            id = {id}
            deletePost={deletePost}
            
            
            >  
            </OtherSinglePostContainer>
        </div>
    );
  }
  export default GetIDforSinglePost;