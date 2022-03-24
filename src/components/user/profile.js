import "./profile.css";
import Feed from "../../components/Feed/Feed";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const name = useParams().name;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${name}`);
      setUser(res.data);
    };
    fetchUser();
  }, [name]);

  return (
    <div className="scroll">
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileUserImg"
                src={
                  user.avatar
                    ? PF + user.avatar
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">{user.title}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={name} />
          </div>
        </div>
      </div>
    </div>
  );
}
