import axios from "../utils/axios";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const dateRef = useRef("");
  const timeRef = useRef("");
  const locationRef = useRef("");
  const navigate = useNavigate();
  const userData = sessionStorage.getItem("userData");
  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;
    const date = `${
      new Date(dateRef.current.value).toISOString().split("T")[0]
    }T${time}`;
    const location = locationRef.current.value;
    console.log(title);
    try {
      let { data } = await axios.post("/event/create", {
        title: title,
        date: date,
        time: time,
        location: location,
        description: description,
      });
      console.log(data.event);
      navigate("/home");
      toast.success("Event created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create event.");
    }
  };
  return (
    <>
      <Navbar />
      <div className="creatediv">
        <input ref={titleRef} placeholder="Title" />
        <input ref={dateRef} type="date" />
        <input ref={timeRef} type="time" />
        <input ref={locationRef} placeholder="Location" />
        <textarea ref={descriptionRef} placeholder="Description" />
        <button onClick={handleSubmit}>Create Event</button>
      </div>
    </>
  );
};

export default CreateEvent;
