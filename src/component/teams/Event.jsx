import React from 'react';
import { useLocation } from 'react-router-dom';

function Event() {
  const location = useLocation();
  const formData = location.state.formData;

  return (
    <div>
      <h1>Event Details</h1>
      <p>Event Name: {formData.eventName}</p>
      <p>Organization: {formData.organization}</p>
      <p>Venue: {formData.venue}</p>
      <p>Event Details: {formData.eventDetails}</p>
      <p>Start Date: {formData.startDate && formData.startDate.toString()}</p>
      <p>Start Time: {formData.startTime}</p>
      <p>End Date: {formData.endDate && formData.endDate.toString()}</p>
      <p>End Time: {formData.endTime}</p>
    </div>
  );
}

export default Event;

