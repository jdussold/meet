// Import the necessary components from the "react" package and the local "App.css" file
import React from "react";
import "./App.css";

// Define a new function-based component called "WelcomeScreen"
function WelcomeScreen(props) {
  // Render the welcome screen if "showWelcomeScreen" is true; otherwise, render nothing
  return props.showWelcomeScreen ? (
    <div className="welcome-screen">
      <h1>Welcome to the Meet app</h1>
      <h4>
        Log in to see upcoming events around the world for full-stack developers
      </h4>
      {/* Create a button that will call the "getAccessToken" function from the props when clicked */}
      <div className="button_cont" align="center">
        <button
          onClick={() => {
            props.getAccessToken();
          }}
          rel="nofollow noopener"
          className="login-button"
        >
          {/* Add a Google icon and label to the button */}
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log
o.svg"
              alt="Google sign-in"
            />
          </div>
          <b>Sign in with google</b>
        </button>
      </div>
      {/* Add a link to the privacy policy */}
      <a
        href="https://jdussold.github.io/meet/privacy.html"
        rel="nofollow noopener"
      >
        Privacy policy
      </a>
    </div>
  ) : null;
}

// Export the "WelcomeScreen" component as the default export
export default WelcomeScreen;
