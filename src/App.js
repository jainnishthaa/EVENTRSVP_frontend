import { Route, Routes } from "react-router-dom";
import "./App.css";
import EventDetails from "./components/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function App() {
  const handleDateClick = (arg) => {
    console.log(arg.event)
    alert(arg.event);
  };
  return (
    // <FullCalendar
    //   plugins={[dayGridPlugin, interactionPlugin]}
    //   eventClick={handleDateClick}
    //   initialView="dayGridMonth"
    //   weekends={false}
    //   events={[
    //     { title: "event 1", date: "2025-01-01",time:"20:00" },
    //     { title: "event 2", date: "2025-01-02",time:"20:00" },
    //   ]}
    // />
    <Routes >
      <Route path="/" element={<Welcome/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/create-event" element={<CreateEvent/>}/>
      <Route path="/event/:eventId" element={<EventDetails/>}/>
    </Routes>
  );
}

export default App;
