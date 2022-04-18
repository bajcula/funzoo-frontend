import { useParams } from "react-router-dom";
import SingleUserSavedPosts from "../routes/Accounts/SingleAccount/SingleUserSavedPosts/SingleUserSavedPosts";

function GetIDforSavedPosts() {
    const { id } = useParams();
    console.log(id);
    return (
        <div>
            <SingleUserSavedPosts theID={id} />
        </div>
    );
  }
  export default GetIDforSavedPosts;