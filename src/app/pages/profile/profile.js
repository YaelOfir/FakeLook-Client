import "./profile.css";
import Feed from "../../components/feed/Feed";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const [avatar] = useState(false);

  return (
    <div className="box">
      <div className="profile">
        <div classname="profileRight">
          <div classname="profileRightTop">
            <img
              classname="profileUserImg"
              src={avatar ? avatar : user.avatar}
              alt=""
            />

            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">{user._id}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
