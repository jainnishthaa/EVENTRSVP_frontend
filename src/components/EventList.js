import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
