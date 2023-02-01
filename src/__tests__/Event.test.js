import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper, event;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });
  test("renders event", () => {
    expect(EventWrapper).toBeDefined();
  });
  test("render event summary as h1", () => {
    const summary = EventWrapper.find("h1.summary");
    expect(summary).toHaveLength(1);
    expect(summary.text()).toBe(event.summary);
  });
  test("render event start time and timezone", () => {
    const eventStart = EventWrapper.find("p.event-start");
    expect(eventStart).toHaveLength(1);
    expect(eventStart.text()).toBe(
      `${new Date(event.start.dateTime).toString()} ${event.start.timeZone}`
    );
  });
  test("render event location", () => {
    const eventLocation = EventWrapper.find("p.event-location");
    expect(eventLocation).toHaveLength(1);
    expect(eventLocation.text()).toBe(`@${event.summary} | ${event.location}`);
  });
  test('render "show details" button when event is collapsed', () => {
    const detailsButton = EventWrapper.find("button.details-btn");
    expect(detailsButton).toHaveLength(1);
    expect(detailsButton.text()).toBe("show details");
  });
  test("render details collapsed by default", () => {
    expect(EventWrapper.state("collapsed")).toBe(true);
  });
  test("render details expanded after clicking button", () => {
    const detailsButton = EventWrapper.find("button.details-btn");
    expect(detailsButton.text()).toBe("show details");
    expect(EventWrapper.find("h2.about")).toHaveLength(0);
    expect(EventWrapper.find("a.link")).toHaveLength(0);
    expect(EventWrapper.find("p.description")).toHaveLength(0);
    detailsButton.simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(false);
  });
  test("collapse details if expanded", () => {
    EventWrapper.setState({ collapsed: false });

    const detailsButton = EventWrapper.find("button.details-btn");
    const aboutHeader = EventWrapper.find("h2.about");
    const link = EventWrapper.find("a.link");
    const description = EventWrapper.find("p.description");

    expect(detailsButton.text()).toBe("hide details");
    expect(aboutHeader).toHaveLength(1);
    expect(aboutHeader.text()).toBe("About event:");
    expect(link).toHaveLength(1);
    expect(link.text()).toBe("See details on Google Calendar");
    expect(link.prop("href")).toBe(event.htmlLink);
    expect(description).toHaveLength(1);
    expect(description.text()).toBe(event.description);

    detailsButton.simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(true);
  });
});
