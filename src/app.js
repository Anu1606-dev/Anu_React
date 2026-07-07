import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/header";
import Body from "./components/body";

/* ------------------------------ App Layout ------------------------------ */

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

/* ------------------------------ React Root ------------------------------ */

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);