// Import required packages and components
import React, { Component } from "react";
import { ErrorAlert } from "./Alert";
import { FormControl, InputGroup } from "react-bootstrap";

// Define the NumberOfEvents component as a class component
class NumberOfEvents extends Component {
  // Define the initial state of the CitySearch component
  state = {
    numOfEvents: 32,
    errorText: "",
    isErrorVisible: false,
  };

  // Function that updates the number of events and display an error message if necessary
  changeNum = (value) => {
    let errorText = "";
    let isErrorVisible = false;

    // If the value is less than 1 or greater than 32, set an error message and make the error visible
    if (value < 1 || value > 32) {
      errorText = "Select number from 1 to 32";
      isErrorVisible = true;
    }

    // Update the state variables based on the new value and error visibility
    this.setState({
      errorText,
      numOfEvents: value,
      isErrorVisible,
    });

    // Call the "updateNumberOfEvents" function from the props with the new value
    this.props.updateNumberOfEvents(undefined, value);
  };

  // When the component mounts, set the number of events to the prop value or 32 if none is provided
  componentDidMount() {
    this.setState({ numOfEvents: this.props.numOfEvents || 32 });
  }

  // Render a label and input field for selecting the number of events, along with an error message if applicable
  render() {
    const { numOfEvents, errorText, isErrorVisible } = this.state;

    return (
      <div className="numOfEvents">
        {isErrorVisible && <ErrorAlert text={errorText} />}
        <label className="numOfEvents-label">
          Number of events
          <InputGroup>
            <FormControl
              className="numOfEvents custom-input"
              type="number"
              value={numOfEvents}
              onChange={(event) => this.changeNum(event.target.value)}
            />
          </InputGroup>
        </label>
      </div>
    );
  }
}

// Export the "NumberOfEvents" component as the default export
export default NumberOfEvents;
