import React, { useState } from "react";
import axios from "axios";
import { FileUploader } from "./FileUploader.jsx";
//import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Preview } from "./Preview";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const onSuccess = (savedFiles) => {
    setFiles(savedFiles);
  };

  const onSubmit = async () => {
    const data = new FormData();
    data.append("title", title);
    data.append("file", setFiles);
    await axios
      .post("http://localhost:4000/posts", data)
      .then((res) => {
        alert("File Upload success");
      })
      .catch((err) => alert("File Upload Error"));

    setTitle("");
  };

  return (
    <div>
      <form >
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />

          <FileUploader onSuccess={onSuccess} />
          <Preview files={files} />
          <ToastContainer />

          <button onClick={onSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
