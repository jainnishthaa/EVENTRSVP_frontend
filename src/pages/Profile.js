import { useNavigate } from "react-router-dom";
import EventList from "../components/EventList";
import Navbar from "../components/Navbar";
import ProfileCalender from "../components/ProfileCalender";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState([]);
  const [view, setView] = useState("calendar");
  const navigate = useNavigate();
  const userData = sessionStorage.getItem("userData");
  useEffect(() => {
    async function getEvents() {
      try {
        let { data } = await axios.get("/user/events");
        console.log(data.events);
        setUser(data.user);
        setEvents(data.events);
      } catch (error) {
        console.log(error);
      }
    }
    if (!userData) {
      navigate("/");
    } else {
      getEvents();
    }
  }, []);
  return (
    <div className="profile-div">
      <Navbar />
      <h1>Hii {user.name}</h1>
      <div className="switch-div">
        <h3>Your Events</h3>
        <button
          onClick={() => setView(view === "calendar" ? "list" : "calendar")}
        >
          Switch to {view === "calendar" ? "List" : "Calendar"} View
        </button>
      </div>
      {view === "calendar" ? (
        <ProfileCalender events={events} />
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
};

export default Profile;
