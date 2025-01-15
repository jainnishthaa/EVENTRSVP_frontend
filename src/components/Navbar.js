import axios from "../utils/axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/logout");
      sessionStorage.removeItem("userData");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/create-event">Create Event</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
