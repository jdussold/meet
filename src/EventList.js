// Import required packages and components
import React, { Component } from "react";
import Event from "./Event";

// Define the EventList component as a class component
class EventList extends Component {
  render() {
    // Destructure the "events" and "numberOfEvents" props from the component's props object
    const { events } = this.props;
    const displayedEvents = events.slice(0, this.props.numberOfEvents);
    // Render a list of "Event" components, one for each event in the "displayedEvents" array
    return (
      <ul className="EventList">
        {displayedEvents.map((event) => (
          <li key={event.id}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    );
  }
}

// Export the "EventList" component as the default export
export default EventList;
