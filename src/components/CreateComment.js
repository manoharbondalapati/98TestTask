import React, { useState } from "react";
import { message } from "antd";
import '../App.css';

const CreateComment = ({ onClose, AddingComment }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [body, setbody] = useState("");

  const handleAddComment = async () => {
    const newComment = {
      name,
      email,
      body,
      postId: 1,
    };
    await AddingComment(newComment);
    message.success("Added Comment Successfully");
    setname("");
    setemail("");
    setbody("");
    onClose();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Comment</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </label>
        <label>
          Body:
          <textarea
            type="text"
            value={body}
            onChange={(e) => setbody(e.target.value)}
          />
        </label>
        <button onClick={handleAddComment}>Create</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CreateComment;
