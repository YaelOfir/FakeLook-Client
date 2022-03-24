import { useContext, useEffect, useState } from "react";
import Post from "../posts/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Feed({ name }) {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = name
        ? await axios.get(
            "http://localhost:4000/post/posts/profile/" + name
          )
        : await axios.get(
            "http://localhost:4000/post/posts/timeline/" + user._id
          );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [name, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!name || name === user.name) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
