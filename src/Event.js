// Importing the necessary modules from react-bootstrap and React itself
import React, { Component } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

// Define the Event component as a class component
class Event extends Component {
  // Declaring the initial state for the component
  state = { collapsed: true };

  // Function that toggles the value of the 'collapsed' state property
  toggleDetails = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    // Destructuring the 'event' property from the props object
    const { event } = this.props;

    // renders an event card that displays various information depending on whether or not the Show Details button is clicked
    return (
      <Container className="event">
        <Row>
          <Col xs={12} md={12}>
            <Card
              className="event-card"
              style={{ border: "none", width: "100%" }}
            >
              <Card.Header>{event.summary}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {`${new Date(event.start.dateTime).toString()} ${
                    event.start.timeZone
                  }`}
                </Card.Text>
                <Card.Text>{`@${event.summary} | ${event.location}`}</Card.Text>
                <Button
                  className="event-btn"
                  variant="success"
                  onClick={this.toggleDetails} // When the button is clicked, it calls the toggleDetails function
                >
                  {this.state.collapsed ? "Show Details" : "Hide Details"}
                </Button>
                {/* If the 'collapsed' state property is false, the following is shown */}
                {!this.state.collapsed && (
                  <div className="event-details">
                    <h2 className="about">About event:</h2>
                    <a className="link" href={event.htmlLink}>
                      See details on Google Calendar
                    </a>
                    <p className="description">{event.description}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

// Exporting the Event component
export default Event;
