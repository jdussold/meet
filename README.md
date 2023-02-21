# Meet App

Welcome to Meet App, a serverless progressive web application (PWA) built with React using test-driven development (TDD). This app allows users to filter events by city, view event details, specify the number of events to view, use the app offline, and see data visualizations of upcoming events.

## Features

- Filter events by city
- Show/hide event details
- Specify number of events
- Use the app offline
- Data visualization

### Filter events by city

Users can filter events by city to see the list of events taking place in that city. The app will show upcoming events from all cities by default. When users start typing in the city textbox, they will see a list of cities (suggestions) that match what they've typed. Users can also select a city from the suggested list to receive a list of upcoming events in that city.

### Show/hide event details

Users can show/hide event details to see more/less information about an event. By default, an event element is collapsed, but users can expand an event to see its details. Users can also collapse an event to hide its details.

### Specify number of events

Users can specify the number of events they want to view in the app. If a user hasn't specified a number, 32 is the default number. Users can change the number of events they want to see.

### Use the app offline

Users can use the app when offline to see the events they viewed the last time they were online. The app will show cached data from their previous session when there's no internet connection. Users will receive an error message indicating that the change is not possible while offline when attempting to change the settings (city, time range).

### Data visualization

Users can see a chart showing the upcoming events in each city so that they know what events are organized in which city. The chart will show the number of upcoming events in that city when a user searches for events for that city.

## Components

### App.js

![App_Component](/src/img/App.png)

The `App.js` file is the main component of the Meet App. It is a class component that renders other sub-components such as `EventList`, `CitySearch`, `NumberOfEvents`, and `WelcomeScreen`. The component has the following functions:

- `updateEvents`: This method is used to update events based on location.
- `getData`: This function generates data for the scatter chart.
- `updateNumberOfEvents`: This function updates the number of events displayed.
- `componentDidMount`: This function is called when the component is mounted and it fetches the events data from the backend API.
- `componentWillUnmount`: This function is called when the component is about to be unmounted.
- `render`: This method renders the components that make up the app.

### Api.js

The `Api.js` file contains functions responsible for retrieving data from the server and checking user authentication. Here's a brief explanation of each function:

- `extractLocations`: This function takes an array of events and returns an array of unique locations.
- `checkToken`: This function checks if an access token is valid by making a GET request to the Google OAuth API.
- `removeQuery`: This function removes any query parameters from the current URL, which may have been added during the OAuth authentication process.
- `getToken`: This function exchanges the authorization code obtained during the OAuth authentication process for an access token.
- `getAccessToken`: This function retrieves the access token from local storage and checks if it is still valid. If the access token is not valid or not present, the function will attempt to exchange the authorization code for a new access token. If the authorization code is not present, the function will redirect the user to the Google OAuth authorization page.
- `getEvents`: This function retrieves a list of events using the provided access token. If the user is running the app locally, the function returns mock data instead of making a network request. If the user is offline, the function retrieves the last stored events from localStorage and returns them. If the user is online and has a valid access token, the function retrieves a list of events from the backend API and returns them.

Overall, the `Api.js` file is responsible for retrieving and managing data from the server, and for checking user authentication.

### CitySearch.js

![CitySearch](/src/img/CitySearch.png)

The `CitySearch` component is responsible for rendering a search box that allows the user to filter and select a city. The component uses the `InputGroup`, `FormControl`, `ListGroup`, and `Alert` components from the `react-bootstrap` package to render the search box and suggestions list.

The `CitySearch` component has a state that keeps track of the current query, matching suggestions, and whether the suggestions list should be shown or not. The component receives a list of locations as a prop and filters them based on the current query.

When a suggestion is clicked, the `handleItemClicked` function is called, which sets the selected suggestion and hides the suggestions list. It also calls the `updateEvents` function with the selected suggestion as an argument.

### Event.js

![Event](/src/img/Event.png)

The `Event` component is responsible for rendering an event card that displays the event's summary, start time, location, and description. When the "Show Details" button is clicked, the component displays additional information about the event, including a link to the event on Google Calendar and the event's description.

The `Event` component has a state property called `collapsed` that keeps track of whether the event's details should be displayed or not. The component receives an event object as a prop and renders it based on whether the `collapsed` property is true or false.

When the "Show Details" button is clicked, the `toggleDetails` function is called, which toggles the value of the `collapsed` property.

### EventGenre.js

![EventGenre](/src/img/EventGenre.png)

The `EventGenre` component is responsible for rendering a pie chart that shows the distribution of event genres based on the current list of events. The component uses the `PieChart`, `Pie`, `Cell`, `ResponsiveContainer`, and `Legend` components from the `recharts` package to render the chart.

The `EventGenre` component has a state that keeps track of the data that should be rendered in the pie chart. The component receives a list of events as a prop and uses regular expressions to match each event's summary to a predefined list of genres.

When the component mounts or receives new events, the `getData` function is called, which computes the value (i.e., count) for each genre based on the events that match its regular expression. The result is an array of objects that contains the genre's label and value.

The `EventGenre` component renders a responsive container that automatically adjusts the size of the chart based on the container's dimensions. The chart contains a `Pie` component that renders each data point as a slice of the pie. The `Cell` component is used to assign a color from the `colors` array to each data point. The chart also contains a `Legend` component that displays the label for each genre.

### EventList.js

![EventList](/src/img/EventList.png)

The `EventList` component is responsible for rendering a list of `Event` components based on an array of events passed in as a prop. It also includes functionality to limit the number of events displayed based on another prop called `numberOfEvents`.

The component receives the events array and number of events to display through its props object, and it destructures these values in its `render` method. It then creates a new array of events to display, which is limited to the number of events specified in the `numberOfEvents` prop.

The `EventList` component renders a list of `Event` components using the `map` function to iterate over the `displayedEvents` array. Each `Event` component is passed an individual event as a prop, and is enclosed in a `li` element with a unique `key` property.

### mock-data.js

The `mock-data.js` file contains an array of sample event objects that is used to populate the app's event list. Each event object contains various properties, such as an ID, summary, location, start time, end time, and more.

The event objects in this array are used to provide a realistic set of data for the application, and can be replaced with actual event data from an external source if desired.

### NumberOfEvents.js

![NumberOfEvents](/src/img/NumberOfEvents.png)

The `NumberOfEvents` component is responsible for rendering a label and input field for selecting the number of events to display on the app's event list. It also includes functionality to update the event list with the selected number of events and display an error message if an invalid value is entered.

The component maintains an internal state with the number of events to display and error message visibility. It renders a label and input field for selecting the number of events, along with an error message if an invalid value is entered. When a new number of events is selected, the component updates its state and calls a function from its props to update the event list with the new value.

### WelcomeScreen.jsx

![WelcomeScreen](/src/img/WelcomeScreen.png)

The `WelcomeScreen.jsx` component is a function-based component that displays a welcome screen to the user, with an invitation to log in to see upcoming events around the world for full-stack developers. This component also includes a button that allows the user to log in using Google authentication, and a link to the app's privacy policy.

The component takes a prop called `showWelcomeScreen` which determines whether to show the welcome screen or not. If `showWelcomeScreen` is `true`, the welcome screen will be displayed; otherwise, nothing will be rendered.

The `WelcomeScreen` component receives another prop called `getAccessToken`, which is a function that is called when the user clicks on the "Sign in with Google" button. This function initiates the process of authenticating the user with Google and retrieving an access token.

The `WelcomeScreen` component renders the following elements:

- A `<div>` element with the `welcome-screen` class, which contains the main content of the welcome screen.
- An `<h1>` element that displays the text "Welcome to the Meet app".
- An `<h4>` element that displays the text "Log in to see upcoming events around the world for full-stack developers".
- A `<div>` element that contains a button for logging in with Google authentication. The button's label is "Sign in with Google", and it has a Google icon to the left of the label.
- A link to the app's privacy policy.

Conclusion:

The Meet App is a serverless progressive web application built with React using test-driven development (TDD). It allows users to filter events by city, view event details, specify the number of events to view, use the app offline, and see data visualizations of upcoming events.
