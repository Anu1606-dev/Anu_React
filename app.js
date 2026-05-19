import React from "react";
import ReactDOM from "react-dom/client";

const jsxHeading = <h1 id="heading02">Hello React!!❤️</h1>;
console.log(jsxHeading);

// for multiple lines JSX code, we need to wrap it in parentheses
const jsxHeading2 = (<h1 className="head">
  Hello React!!❤️
  </h1>);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(jsxHeading);
