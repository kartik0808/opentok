import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "@opentok/client";
import axios from "axios";

import App from "./App";
import "./index.css";
import "./polyfills";

// import { SAMPLE_SERVER_BASE_URL, API_KEY, SESSION_ID, TOKEN } from "./config";

function renderApp() {
  // const [token, setToken] = useState("");
  // const [sessionId, setSessionId] = useState("");
  // axios
  //   .get("http://localhost:8000/home")
  //   .then((res) => {
  //     // SESSION_ID = res.sessionId;
  //     token = res.data.token;
  //     sessionId = res.data.sessionId;
  //     console.log("this is session", res);
  //   })
  //   .catch((err) => console.log("this is error", err));

  ReactDOM.render(<App />, document.getElementById("root"));
}

// if (API_KEY && TOKEN && SESSION_ID) {
// console.log("session id", sessionId, "+", token);
renderApp();
// } else {
//   fetch(SAMPLE_SERVER_BASE_URL + "/session")
//     .then((data) => data.json())
//     .then(renderApp)
//     .catch((err) => {
//       console.error("Failed to get session credentials", err);
//       alert(
//         "Failed to get opentok sessionId and token. Make sure you have updated the config.js file."
//       );
//     });
// }
