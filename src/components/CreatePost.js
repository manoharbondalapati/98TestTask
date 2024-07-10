import axios from "axios";
import React, { useState } from "react";
import "../App.css";
import { message } from "antd";

const CreatePost = ({ onClose, postCreated }) => {
  const [formData,setFormData] = useState(
    {
      title:'',
      body:'',
    }
  );
  const user = JSON.parse(localStorage.getItem('user'));


  const handleChange =(e)=>
  {
    const {name,value}=e.target;
    setFormData((prevFormData)=>({
      ...prevFormData,[name]:value,
    }));

  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const {title,body}=formData;
    if(!title || !body)
    {
      message.error('please Enter Post Details');
      return
    }
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title,
          body,
          userId:user.id,
          
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
        <form onSubmit={handleCreatePost}>
        <lable>
          Title:
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </lable>
        <lable>
          Body:
          <textarea name="body" value={formData.body} onChange={handleChange} />
        </lable>
        <button type="submit" id="create-post" >Create</button>
        <button type="button" id="create-post" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
    
  );
};

export default CreatePost;
