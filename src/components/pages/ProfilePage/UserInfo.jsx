import { Link } from "react-router-dom";
import { NewPost } from "../../../components/index";
import "../../styles/profile.scss";
const UserInfo = () => {
  return (
    <div className="scroll">
      <h2>PROFILE</h2>
      <button>
        <Link to="/Profile/ListOfFriends">Friend List</Link>
      </button>
      <div className="container">
        <NewPost />
      </div>
    </div>
  );
};

export default UserInfo;
