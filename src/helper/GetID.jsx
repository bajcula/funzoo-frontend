import SingleAccount from "../routes/Accounts/SingleAccount/SingleAccount";
import { useParams } from "react-router-dom";

function GetID() {
    const { id } = useParams();
    console.log(id);
    return (
        <div>
            <SingleAccount theID={id} />
        </div>
    );
  }
  export default GetID;

