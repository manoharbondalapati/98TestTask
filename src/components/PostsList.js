import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";
import "../App.css";
import { message } from "antd";
import Header from "./Header";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
   
      const fetchPosts = async () => {
        try {
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
          );
          const userPosts= response.data.filter(post=>post.userId===user.id);
          setPosts(userPosts);
        } catch (error) {
          console.error("Please Login", error);
        }
      };
      fetchPosts();
    
  }, [navigate, user.id]);

  const handlePostCreate = (newpost) => {
    console.log(newpost);
    setPosts((prevPosts)=>[  ...prevPosts,newpost ]);
    message.success("New Post added Successfully");
  };

  return (
    <div id="postList">
      <Header />
      <header>
        <div>
          <button onClick={() => setShowModel(true)} id="createpost-button">
            Create Post
          </button>
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dpfnyv0ut/image/upload/v1720502108/images_n4d5e3.jpg"
            alt="logo"
          />
        </div>
      </header>
      <center>
        {posts.length > 0 ? (
          <table border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/posts/${post.id}/comments`)}
                      id="action-button"
                    >
                      Comments
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p id="loading">
            {posts ? "Getting Data..." : "No posts available."}
          </p>
        )}
      </center>
      {showModel && (
        <CreatePost
          onClose={() => setShowModel(false)}
          postCreated={handlePostCreate}
        />
      )}
    </div>
  );
};

export default PostsList;
