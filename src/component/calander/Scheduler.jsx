import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
    color: getRandomColor(),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
    color: getRandomColor(),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
    color: getRandomColor(),
  },
];

// Generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Scheduler() {
  const [newEvent, setNewEvent] = useState({ title: "", start: null, end: null });
  const [allEvents, setAllEvents] = useState(events);
  const [showModal, setShowModal] = useState(false);

  function handleAddEvent() {
    // Check if any required field is empty
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill in all required fields.");
      return;
    }
  
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = newEvent.start;
      const d3 = new Date(allEvents[i].end);
      const d4 = newEvent.end;
  
      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        return;
      }
    }
  
    const newColor = getRandomColor();
    setAllEvents([...allEvents, { ...newEvent, color: newColor }]);
    setNewEvent({ title: "", start: null, end: null });
    setShowModal(false);
  }
  

  function handleSelectDate(date) {
    setNewEvent({ ...newEvent, start: date, end: date });
    setShowModal(true);
  }

  return (
    <div className="App container">
      <h2 className="mt-4">Add New Event</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          className="form-control"
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          className="form-control"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        selectable={true}
        onSelectSlot={(slotInfo) => handleSelectDate(slotInfo.start)}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="eventTitle" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="eventTitle"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="eventStart" className="form-label">
              Start Date:
            </label>
            <DatePicker
              className="form-control"
              id="eventStart"
              selected={newEvent.start}
              onChange={(start) => setNewEvent({ ...newEvent, start })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="eventEnd" className="form-label">
              End Date:
            </label>
            <DatePicker
              className="form-control"
              id="eventEnd"
              selected={newEvent.end}
              onChange={(end) => setNewEvent({ ...newEvent, end })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Scheduler;
