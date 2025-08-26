import React, { useState, useEffect } from 'react';
import './calendar.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('https://api.sfuhub.ca/calendar/events');
      const data = await response.json();
      
      setEvents(data);

      // Extract unique tags
      const uniqueTags = Array.from(new Set(data.flatMap(event => event.tags)));
      setTags(['All', ...uniqueTags]);
    };

    fetchEvents();
  }, []);

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const filteredEvents = selectedTag === 'All' ? events : events.filter(event => event.tags.includes(selectedTag));

  return (
    <div className="calendar-container">
      <div className="filter-container">
        <h2>Filter by Tag</h2>
        <select className="tag-selector" onChange={handleTagChange}>
          {tags.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "prev,next,today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"75vh"}
          events={filteredEvents}
        />
      </div>
    </div>
  );
}

export default Calendar;
