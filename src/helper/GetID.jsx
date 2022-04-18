import SingleAccount from "../routes/Accounts/SingleAccount/SingleAccount";
import { useParams } from "react-router-dom";

function GetID(props) {
    const { id } = useParams();
    return (
        <div>
            <SingleAccount currentUser={props.currentUser} theID={id} />
        </div>
    );
  }
  export default GetID;

