import React, { Component } from "react";
import { InputGroup, FormControl, ListGroup, Alert } from "react-bootstrap";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
    showSuggestions: undefined,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          "We can not find the city you are looking for. Please try another city",
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: "",
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: "",
    });
    this.props.updateEvents(suggestion);
  };

  handleInputBlur = () => {
    setTimeout(() => {
      this.setState({ showSuggestions: false });
    }, 100);
  };

  render() {
    return (
      <div className="CitySearch">
        {this.state.infoText && (
          <Alert variant="info">{this.state.infoText}</Alert>
        )}
        <label className="citySearch-label">
          City
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
          {this.state.suggestions.map((suggestion) => (
            <ListGroup.Item
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
              action
            >
              {suggestion}
            </ListGroup.Item>
          ))}
          <ListGroup.Item onClick={() => this.handleItemClicked("all")} action>
            <b>See all cities</b>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default CitySearch;
