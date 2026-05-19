import React from "react";
import ReactDOM from "react-dom/client";

const jsxHeading = <h1 id="heading02">Hello React!!❤️</h1>;
console.log(jsxHeading);

const elem = (
  <span>
    {jsxHeading}
    Magic!
  </span>
);

// for multiple lines JSX code, we need to wrap it in parentheses
const JSXHeading2 = () => (
  <h1 className="head">
    Hello React!!❤️
  </h1>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
const number = 100;

// React Functional Component
const HeadingComponent = () => ( 
  <div>
    <JSXHeading2/> 
    <JSXHeading2></JSXHeading2>
    {JSXHeading2()}
    {console.log("Anushka")}
    {number}
    {200+300-100}
    {"Hello React!!❤️".toUpperCase()}
    {jsxHeading}
    <div id="container">
        <h1>React Functional Component!!</h1>
    </div>
  </div>
);
// rendering React Functional Component
root.render(<HeadingComponent/>); 

