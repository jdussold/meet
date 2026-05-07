// Import required packages and components
import React, { Component } from "react";
import { InputGroup, FormControl, ListGroup, Alert } from "react-bootstrap";

// Define the CitySearch component as a class component
class CitySearch extends Component {
  // Define the initial state of the CitySearch component
  state = {
    query: "",
    suggestions: [],
    showSuggestions: undefined,
  };

  // Called when the text in the search box is changed
  handleInputChanged = (event) => {
    const value = event.target.value;
    // Show the suggestions
    this.setState({ showSuggestions: true });
    // Filter the locations list based on the current query
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    // If there are no matching suggestions, set info text
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          "We can not find the city you are looking for. Please try another city",
      });
    } else {
      // Otherwise, update the state with the matching suggestions
      return this.setState({
        query: value,
        suggestions,
        infoText: "",
      });
    }
  };

  // Called when a suggestion is clicked
  handleItemClicked = (suggestion) => {
    // Set the selected suggestion and hide the suggestions list
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: "",
    });
    // Call the updateEvents function with the selected suggestion
    this.props.updateEvents(suggestion);
  };

  // Called when the search box loses focus
  handleInputBlur = () => {
    // Hide the suggestions list after a short delay
    setTimeout(() => {
      this.setState({ showSuggestions: false });
    }, 300);
  };

  render() {
    return (
      <div className="CitySearch">
        {/* Show the info text if there is any */}
        {this.state.infoText && (
          <Alert variant="info">{this.state.infoText}</Alert>
        )}
        {/* Render the search box and suggestions list */}
        <label className="citySearch-label">
          Choose a city
          <InputGroup>
            <FormControl
              type="text"
              className="city custom-input"
              value={this.state.query}
              onChange={this.handleInputChanged}
              placeholder="Search for location..."
              onFocus={() => {
                this.setState({ showSuggestions: true });
              }}
              onBlur={this.handleInputBlur}
            />
          </InputGroup>
        </label>
        <ListGroup
          className="suggestions"
          style={this.state.showSuggestions ? {} : { display: "none" }}
        >
          {/* Render the list of suggestions */}
          {this.state.suggestions.map((suggestion) => (
            <ListGroup.Item
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
              action
            >
              {suggestion}
            </ListGroup.Item>
          ))}
          {/* Render the "See all cities" option */}
          <ListGroup.Item onClick={() => this.handleItemClicked("all")} action>
            <b>See all cities</b>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default CitySearch;
