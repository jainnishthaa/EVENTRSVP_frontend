import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";

const ProfileCalender = ({events}) => {
  console.log(events);
  const navigate = useNavigate();
  const handleEventClick = async (info) => {
    const eventId = info.event.id;
    // console.log(eventId);
    navigate(`/event/${eventId}`);
  };
  const calendarEvents = events.map((event) => ({
    id: event._id,
    title: event.title,
    date: event.date,
    backgroundColor: event.role === "organizer" ? "red" : "green", 
    borderColor: event.role === "organizer" ? "red" : "green"
  }));
  return (
    <div className="calendar-div">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventClick={handleEventClick}
        selectable={true}
      />
    </div>
  );
};

export default ProfileCalender;
