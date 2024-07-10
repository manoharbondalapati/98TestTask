import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const user = response.data.find(
        (user) => user.username === username && user.email === email
      );
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        message.success("login Success");
        navigate("./postslist");
      } else {
        message.error("login failed");
      }
    } catch (error) {
      message.error("login faild:", error);
    }
  };

  return (
    <Container maxWidth="sm" >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          LOGIN
        </Typography>
    
      <TextField
        label="Username"
        variant="outlined"
        margin="normal"
        fullWidth
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required

      />
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        margin="normal"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Login
      </Button>
      </Box>
    </Container>
  );
};

export default Login;
