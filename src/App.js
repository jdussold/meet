import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import WelcomeScreen from "./WelcomeScreen";
import { getEvents, extractLocations, getAccessToken, checkToken } from "./api";
import "./nprogress.css";
import { Container, Alert } from "react-bootstrap";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  };

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  };

  updateNumberOfEvents = (event, value) => {
    this.setState({ numberOfEvents: value });
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    let isTokenValid = false;
    let code = null;

    // Check if the app is online before attempting to check the token or URL code
    if (navigator.onLine) {
      isTokenValid = (await checkToken(accessToken))?.error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      code = searchParams.get("code");
      const showWelcomeScreen = !accessToken && !isTokenValid && !code;
      this.setState({ showWelcomeScreen });
    } else {
      // If the app is offline, show the cached events
      const events = JSON.parse(localStorage.getItem("lastEvents")).events;
      this.setState({ events, locations: extractLocations(events) });
    }

    // Call the getEvents function only if the app is online
    if (navigator.onLine && (code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const accessToken = localStorage.getItem("access_token");
    const showWelcomeScreen = !accessToken && navigator.onLine;
    return (
      <Container className="my-6" style={{ margin: "auto", width: "100%" }}>
        {!navigator.onLine && (
          <Alert variant="info">
            You are currently viewing cached data because the app is offline.
          </Alert>
        )}
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
        <EventList
          events={this.state.events}
          numberOfEvents={this.state.numberOfEvents}
        />
        <WelcomeScreen
          showWelcomeScreen={showWelcomeScreen}
          getAccessToken={getAccessToken}
        />
      </Container>
    );
  }
}

export default App;
