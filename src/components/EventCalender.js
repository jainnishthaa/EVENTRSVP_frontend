import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from "react";
import { useNavigate } from "react-router-dom";

const EventCalender = ({ events }) => {
  const navigate = useNavigate();
  const handleEventClick = async (info) => {
    const eventId = info.event.id;
    // console.log(info.event);
    navigate(`/event/${eventId}`);
  };
  const calendarEvents = events.map((event) => ({
    id: event._id,
    title: event.title,
    date: event.date,
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

export default EventCalender;
