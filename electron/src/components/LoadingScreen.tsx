// ...existing code...
// TODO: Copy full LoadingScreen implementation from web app
import React from "react";

const LoadingScreen = () => (
  <div className="loading-screen-fade">
    <div className="spinner-ios spinner-pulse"></div>
    <span>Loading...</span>
  </div>
);

export default LoadingScreen;
