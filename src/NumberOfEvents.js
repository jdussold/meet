import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numOfEvents: 32,
    errorText: "",
  };

  changeNum = (value) => {
    if (value < 1 || value > 32) {
      this.setState({
        errorText: "Select number from 1 to 32",
        numOfEvents: value,
      });
    } else {
      this.setState({
        errorText: "",
        numOfEvents: value,
      });
    }
    this.props.updateNumberOfEvents(undefined, value);
  };

  componentDidMount() {
    this.setState({ numOfEvents: this.props.numOfEvents || 32 });
  }

  render() {
    const { numOfEvents } = this.state;

    return (
      <div>
        <label>
          Number of events
          <input
            className="numOfEvents"
            type="number"
            value={numOfEvents}
            onChange={(event) => this.changeNum(event.target.value)}
          ></input>
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;
