import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class AlertWrapper extends Component {
  constructor(props) {
    super(props);
    this.variant = null;
  }

  render() {
    return (
      <Alert variant={this.variant}>
        <Alert.Heading>{this.props.text}</Alert.Heading>
      </Alert>
    );
  }
}

class InfoAlert extends AlertWrapper {
  constructor(props) {
    super(props);
    this.variant = "info";
  }
}

class ErrorAlert extends AlertWrapper {
  constructor(props) {
    super(props);
    this.variant = "danger";
  }
}

export { InfoAlert, ErrorAlert };
