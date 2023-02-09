import React, { Component } from "react";
import { ErrorAlert } from "./Alert";
import { FormControl, InputGroup } from "react-bootstrap";

class NumberOfEvents extends Component {
  state = {
    numOfEvents: 32,
    errorText: "",
    isErrorVisible: false,
  };

  changeNum = (value) => {
    let errorText = "";
    let isErrorVisible = false;

    if (value < 1 || value > 32) {
      errorText = "Select number from 1 to 32";
      isErrorVisible = true;
    }

    this.setState({
      errorText,
      numOfEvents: value,
      isErrorVisible,
    });

    this.props.updateNumberOfEvents(undefined, value);
  };

  componentDidMount() {
    this.setState({ numOfEvents: this.props.numOfEvents || 32 });
  }

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

export default NumberOfEvents;
