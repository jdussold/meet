import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents updateNumberOfEvents={() => {}} />
    );
  });
  test("render number of events component", () => {
    expect(NumberOfEventsWrapper).toBeDefined();
  });
  test("render default value of 32", () => {
    expect(NumberOfEventsWrapper.find("input.numOfEvents").prop("type")).toBe(
      "number"
    );
    expect(NumberOfEventsWrapper.state("numOfEvents")).toBe(32);
  });
  test("render text input correctly", () => {
    expect(NumberOfEventsWrapper.find("input.numOfEvents").prop("value")).toBe(
      32
    );
    NumberOfEventsWrapper.find("input.numOfEvents").simulate("change", {
      target: { value: 10 },
    });
    expect(NumberOfEventsWrapper.state("numOfEvents")).toBe(10);
  });
  test("render error text when input is less than 1 or greater than 32", () => {
    NumberOfEventsWrapper.find("input.numOfEvents").simulate("change", {
      target: { value: -1 },
    });
    expect(NumberOfEventsWrapper.state("errorText")).toBe(
      "Select number from 1 to 32"
    );
    NumberOfEventsWrapper.find("input.numOfEvents").simulate("change", {
      target: { value: 33 },
    });
    expect(NumberOfEventsWrapper.state("errorText")).toBe(
      "Select number from 1 to 32"
    );
  });
  test("render correct number of events", () => {
    const renderedNumofEvents = shallow(
      <NumberOfEvents numOfEvents={10} updateNumberOfEvents={() => {}} />
    );
    expect(renderedNumofEvents.state("numOfEvents")).toBe(10);
  });
});
