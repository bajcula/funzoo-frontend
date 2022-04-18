import { useParams } from "react-router-dom";
import SingleUserSavedPosts from "../routes/Accounts/SingleAccount/SingleUserSavedPosts/SingleUserSavedPosts";

function GetIDforSavedPosts(props) {
    const { id } = useParams();
    console.log(id);
    return (
        <div>
            <SingleUserSavedPosts currentUser={props.currentUser} theID={id} />
        </div>
    );
  }
  export default GetIDforSavedPosts;