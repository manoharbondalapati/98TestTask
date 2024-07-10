import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const Post = () => {
  const { id } = useParams();
  const [post, setpost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setpost(response.data);
      } catch (error) {
        console.error("error fetching data:", error);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <>
    <Header/>
    <center className="post-details">
      <h1>MY Post</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </center>
    </>
  );
};

export default Post;
