import React from "react";
import ReactDOM from "react-dom";
import Reviews from "./index.jsx";

console.log('inside app-client.js');
ReactDOM.hydrate(
  <Reviews {...Reviews.initialState} />,
  document.getElementById('Reviews')
);