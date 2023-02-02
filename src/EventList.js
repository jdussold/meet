import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  render() {
    const { events } = this.props;
    const displayedEvents = events.slice(0, this.props.numberOfEvents);
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

export default EventList;
