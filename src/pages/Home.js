import React, { useEffect, useState } from "react";
import EventList from "../components/EventList";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";
import EventCalender from "../components/EventCalender";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("calendar");
  const userData = sessionStorage.getItem("userData");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchEvents() {
      try {
        let { data } = await axios.get("/event/");
        setEvents(data.events);
      } catch (error) {
        console.error(error);
      }
    }
    if (!userData) {
      navigate("/");
    } else {
      fetchEvents();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="switch-div">
        <h3>Upcoming Events</h3>
        <button
          onClick={() => setView(view === "calendar" ? "list" : "calendar")}
        >
          Switch to {view === "calendar" ? "List" : "Calendar"} View
        </button>
      </div>
      {view === "calendar" ? (
        <EventCalender events={events} />
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
};

export default Home;
