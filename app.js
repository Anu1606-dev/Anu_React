import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement(
  'h1',
  { id: "heading01" },
  'Hello from React!!❤️'
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(heading);

const parent = React.createElement('div', { id: "parent" }, [
    React.createElement('h1', { id: "heading01", key: "h1" }, 'Hello Everyone!!❤️'),
    React.createElement('h2', { id: "heading02", key: "h2" }, 'Hello React!!❤️')
]);

console.log(parent);

// This will replace previous render
root.render(parent);