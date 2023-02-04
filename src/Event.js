import React, { Component } from "react";

class Event extends Component {
  state = { collapsed: true };

  toggleDetails = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    const { event } = this.props;
    return (
      <div className="event">
        <h1 className="summary">{event.summary}</h1>
        <p className="event-start">{`${new Date(
          event.start.dateTime
        ).toString()} ${event.start.timeZone}`}</p>
        <p className="event-location">{`@${event.summary} | ${event.location}`}</p>
        <button className="details-btn" onClick={this.toggleDetails}>
          {this.state.collapsed ? "show details" : "hide details"}
        </button>
        {!this.state.collapsed && (
          <div className="event-details">
            <h2 className="about">About event:</h2>
            <a className="link" href={event.htmlLink}>
              See details on Google Calendar
            </a>
            <p className="description">{event.description}</p>
          </div>
        )}
      </div>
    );
  }
}
export default Event;
