import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentCreate from "../comments/CommentCreate";
import CommentList from "../comments/CommentList";
export default function Post({ post }) {
  const auth = useSelector((state) => state.auth);
  const { user: currentUser } = auth;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  //const [user, setUser] = useState({});

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const renderedPosts = Object.values(post).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <CommentList comments={post.comments} />
          <CommentCreate postId={post._id} />
        </div>
      </div>
    );
  });

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(
  //       `http://localhost:5000/user/users?userId=${post.userId}`
  //     );
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${currentUser.name}`}>
              <img
                className="postProfileImg"
                src={
                  currentUser.avatar
                    ? currentUser.avatar
                    : ""
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{currentUser.name}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.title}</span>
          <img
            className="postImg"
            src={"http://localhost:4000/images/" + post.img}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <button
              className="likeIcon"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {/* <CommentList comments={post.comments} /> */}
            </span>
          </div>
        </div>
        <CommentCreate postId={post._id} />
      </div>
    </div>
  );
}
