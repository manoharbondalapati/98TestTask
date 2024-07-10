import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Header = () => {
  const user = sessionStorage.getItem("user");
  const userdata = user ? JSON.parse(user) : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div id="nav">
      <div>
        {" "}
        <h2><span>Hii :</span> {userdata.name}</h2>
      </div>
      <div>
        <button id="logout" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Header;
