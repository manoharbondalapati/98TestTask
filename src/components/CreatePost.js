import axios from "axios";
import React, { useState } from "react";
import "../App.css";

const CreatePost = ({ onClose, postCreated }) => {
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");

  const handleCreatePost = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title,
          body,
          userId: 1,
        }
      );
      postCreated(response.data);
      onClose();
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create New Post</h2>
        <lable>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </lable>
        <lable>
          Body:
          <textarea value={body} onChange={(e) => setbody(e.target.value)} />
        </lable>
        <button onClick={handleCreatePost}>Create</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CreatePost;
