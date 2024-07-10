import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import CreateComment from "./CreateComment";
import { useParams } from "react-router-dom";
import Header from "./Header";


const Comments = () => {
  const [comments, setComments] = useState([]);
  const [showModel, setShowModel] = useState(false);

  
   const {id}=useParams();
   

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fteching Data", error);
      }
    };
    fetchComments();
  }, [id]);

  const handleAddComment = async (newComment) => {
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        newComment
      );
      setComments([...comments, response.data]);
    } catch (error) {
      console.error("Error Adding Comment", error);
    }
  };



  return (
    <div id="comments">
      <Header/>
      <header>
        <div>
       
          <button onClick={() => setShowModel(true)}>Add Comment</button>
         
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dpfnyv0ut/image/upload/v1720502108/images_n4d5e3.jpg"
            alt="logo"
          />
        </div>
      </header>
      <center>
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment,index) => (
              <tr key={comment.id}>
                <td>{index+1}</td>
                <td>{comment.name}</td>
                <td>{comment.email}</td>
                <td>{comment.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>

      {showModel && (
        <CreateComment
          onClose={() => setShowModel(false)}
          AddingComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default Comments;
