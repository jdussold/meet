import React from "react";
import "./App.css";

function WelcomeScreen(props) {
  return props.showWelcomeScreen ? (
    <div className="welcome-screen">
      <h1>Welcome to the Meet app</h1>
      <h4>
        Log in to see upcoming events around the world for full-stack developers
      </h4>
      <div className="button_cont" align="center">
        <button
          onClick={() => {
            props.getAccessToken();
          }}
          rel="nofollow noopener"
          className="login-button"
        >
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
      <a
        href="https://jdussold.github.io/meet/privacy.html"
        rel="nofollow noopener"
      >
        Privacy policy
      </a>
    </div>
  ) : null;
}

export default WelcomeScreen;
