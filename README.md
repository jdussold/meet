# Meet App

Welcome to Meet App, a serverless progressive web application (PWA) built with React using test-driven development (TDD). This app allows users to filter events by city, view event details, specify the number of events to view, use the app offline, and see data visualizations of upcoming events.

## Features

1. **Filter events by city**: Users can filter events by city to see the list of events taking place in that city. The app will show upcoming events from all cities by default. When users start typing in the city textbox, they will see a list of cities (suggestions) that match what they’ve typed. Users can also select a city from the suggested list to receive a list of upcoming events in that city.

2. **Show/hide event details**: Users can show/hide event details to see more/less information about an event. By default, an event element is collapsed, but users can expand an event to see its details. Users can also collapse an event to hide its details.

3. **Specify number of events**: Users can specify the number of events they want to view in the app. If a user hasn't specified a number, 32 is the default number. Users can change the number of events they want to see.

4. **Use the app offline**: Users can use the app when offline to see the events they viewed the last time they were online. The app will show cached data from their previous session when there's no internet connection. Users will receive an error message indicating that the change is not possible while offline when attempting to change the settings (city, time range).

5. **Data visualization**: Users can see a chart showing the upcoming events in each city so that they know what events are organized in which city. The chart will show the number of upcoming events in that city when a user searches for events for that city.

## Development

The development of Meet App followed the test-driven development (TDD) approach, using React.

## Conclusion

We hope you enjoy using Meet App to discover and plan events in your city.
