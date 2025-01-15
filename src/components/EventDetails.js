import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [role, setRole] = useState();
  const [attendees, setAttendees] = useState(null);
  const navigate = useNavigate();
  const userData = sessionStorage.getItem("userData");

  const handleRSVP = async () => {
    console.log(eventId);
    if (role === "rsvp") {
      try {
        let { data } = await axios.get(`/user/rsvp/${eventId}`);
        setEvent(data.event);
        console.log(event);
        setRole("rsvped");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let { data } = await axios.get(`/user/cancel-rsvp/${eventId}`);
        setEvent(data.event);
        setRole("rsvp");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      let { data } = await axios.get(`/event/delete/${eventId}`);
      setEvent(null);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        let { data } = await axios.get(`/event/${eventId}`);
        setRole(data.role);
        setEvent(data.event);
        // console.log(role);
        if (role === "organizer") {
          let { data } = await axios.get(`/user/attendees/${event._id}`);
          setAttendees(data.attendees);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (!userData) {
      navigate("/");
    } else {
      fetchEventDetails();
    }
  }, [eventId]);

  if (!event) return <div>Loading...</div>;
  return (
    <>
      <Navbar />
      <div className="event-details">
        <h2>{event.title}</h2>
        <p>
          Date | Time : {new Date(event.date).toISOString().split("T")[0]} |{" "}
          {event.time}{" "}
        </p>
        <p>Location : {event.location}</p>
        <p>Description: {event.description}</p>
        {role !== "organizer" && (
          <button onClick={handleRSVP}>
            {role === "rsvped" ? "Cancle RSVP" : "RSVP"}
          </button>
        )}
        {role === "organizer" && attendees && (
          <>
            <h2>Attendees</h2>
            <ul>
              {attendees.map((attendee) => (
                <li key={attendee}>
                  {attendee.name} - {attendee.email}
                </li>
              ))}
            </ul>
          </>
        )}
        {role === "organizer" && (
          <button onClick={handleDelete}>Delete Event</button>
        )}
      </div>
    </>
  );
};

export default EventDetails;
