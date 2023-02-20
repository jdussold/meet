// Importing required dependencies
import { mockData } from "./mock-data";
import axios from "axios";
import NProgress from "nprogress";

// This function takes an events array, then uses map to create a new array with only locations.
// It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
// The Set will remove all duplicates from the array.
export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

// This function checks if the provided access token is valid by making a GET request to the Google OAuth API.
export const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

// This function removes any query parameters from the current URL, which may have been added during the OAuth authentication process.
const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

// This function exchanges the authorization code obtained during the OAuth authentication process for an access token.
// The function makes a GET request to a custom backend API that is responsible for exchanging the code for an access token.
// If an access token is obtained, it is saved to localStorage and returned. If an error occurs, the error is returned.
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    "https://6cl0o2ra2b.execute-api.us-east-2.amazonaws.com/dev/api/token" +
      "/" +
      encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

// This function retrieves the access token from localStorage and checks if it is still valid.
// If the access token is not valid or not present, the function will attempt to exchange the authorization code for a new access token.
// If the authorization code is not present, the function will redirect the user to the Google OAuth authorization page.
// The function returns the access token if it is valid and present, or the newly obtained access token if the code was exchanged successfully.
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await axios.get(
        "https://6cl0o2ra2b.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

// This function retrieves a list of events using the provided access token.
// If the user is running the app locally, the function returns mock data instead of making a network request.
// If the user is offline, the function retrieves the last stored events from localStorage and returns them.
// If the user is online and has a valid access token, the function retrieves a list of events from the backend API and returns them.
export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }
  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    NProgress.done();
    return data ? JSON.parse(data).events : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      "https://6cl0o2ra2b.execute-api.us-east-2.amazonaws.com/dev/api/get-events" +
      "/" +
      token;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};
