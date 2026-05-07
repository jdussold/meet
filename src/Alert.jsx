// Importing necessary modules
import React, { Component } from "react";
import { Alert } from "react-bootstrap";

// Defining a class component AlertWrapper
class AlertWrapper extends Component {
  constructor(props) {
    // Call the constructor of the parent class (Component)
    super(props);
    // Set the initial value of 'variant' to null
    this.variant = null;
  }

  render() {
    // Render the Alert component from react-bootstrap
    return (
      <Alert variant={this.variant}>
        <Alert.Heading>{this.props.text}</Alert.Heading>
      </Alert>
    );
  }
}

// Defining a subclass InfoAlert that extends AlertWrapper
class InfoAlert extends AlertWrapper {
  constructor(props) {
    // Call the constructor of the parent class (AlertWrapper)
    super(props);
    // Set the value of 'variant' to 'info'
    this.variant = "info";
  }
}

// Defining another subclass ErrorAlert that extends AlertWrapper
class ErrorAlert extends AlertWrapper {
  constructor(props) {
    // Call the constructor of the parent class (AlertWrapper)
    super(props);
    // Set the value of 'variant' to 'danger'
    this.variant = "danger";
  }
}

// Exporting the InfoAlert and ErrorAlert subclasses as named exports
export { InfoAlert, ErrorAlert };
