const heading = React.createElement('h1', {id: "heading01"}, 'Hello from React!!❤️'); // creating element using React.createElement
console.log(heading); // this will print the object representation of the heading element created by React.createElement
const root = ReactDOM.createRoot(document.getElementById('root')); // creating root in ReactDOM by taking the root div
root.render(heading); // works like appendchild in vanilla js but it replaces the content of the root div with the heading element
// also render converts the heading object into a heading tag inside the root element in the DOM and displays it on the webpage

const parent = React.createElement('div', {id: "parent"}, [ // creating multiple elemnts inside 1 single element
    React.createElement('h1', {id: "heading01"}, 'Hello React!!❤️'),
    React.createElement('h2', {id: "heading02"}, 'This is a subheading!!')
]);
console.log(parent);
root.render(parent); // this will replace the previous heading element with the new parent div containing the h1 and h2 elements