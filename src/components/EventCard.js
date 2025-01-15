import axios from "../utils/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const [isRsvp, setIsRsvp] = useState(false);
  const navigate = useNavigate();
  const handleRSVP = async () => {
    try {
      let { data } = await axios.get(`/user/rsvp/${event._id}`);
      event = data.event;
      setIsRsvp(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>
      {new Date(event.date).toISOString().split("T")[0]} | {event.time}
      </p>
      <button onClick={() => navigate(`/event/${event._id}`)}>Details</button>
    </div>
  );
};

export default EventCard;
