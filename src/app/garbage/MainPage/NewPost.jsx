import { PostCreate, PostList } from "../../../components/index";
import "../../styles/file.scss";
const NewPost = () => {
  return (
    <div>
      <div className="container">
        <h2>Create post</h2>
        <PostCreate />
      </div>
      <h2>Feed</h2>
      <PostList />
    </div>
  );
};

export default NewPost;
