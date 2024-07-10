import React, { useState } from "react";
import { message } from "antd";
import '../App.css';

const CreateComment = ({ onClose, AddingComment }) => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    body:''
  });

  const handleChange =(e)=>
  {
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
  }

  const handleAddComment = async () => {
    const {name,email,body}=formData;

    const validateEmail = /^\S+@\S+\.\S+$/;

   

    if( !name || !email || !body)
    {
      message.error("please Enter Details");
      return
    }
    if(!validateEmail.test(email))
      {
        message.error('please Enter a valid email address.');
        return
      }
    const newComment = {
      name,
      email,
      body,
      postId: 1,
    };
    await AddingComment(newComment);
    message.success("Added Comment Successfully");
    setFormData({name:'',email:'',body:''});
    onClose();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Comment</h2>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Body:
          <textarea
            name="body"
            type="text"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </label>
        <button onClick={handleAddComment}>ADD Comment</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CreateComment;
