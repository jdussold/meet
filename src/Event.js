import React, { Component } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

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
      <Container className="event">
        <Row>
          <Col xs={12} md={12}>
            <Card className="event-card" style={{ border: "none" }}>
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
                  onClick={this.toggleDetails}
                >
                  {this.state.collapsed ? "Show Details" : "Hide Details"}
                </Button>
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
export default Event;
