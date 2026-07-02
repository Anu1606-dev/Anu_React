import React from "react";
import ReactDOM from "react-dom/client";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src="https://static.vecteezy.com/system/resources/previews/011/401/427/non_2x/food-signal-online-food-ordering-logo-design-order-food-on-internet-restaurant-cafe-meals-delivery-online-free-vector.jpg" alt="logo" className="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  )
}

const RestaurantCard = (props) => {
  console.log(props);
  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0", borderRadius: "10px"}}>
      <img 
        className="res-logo"
        src="https://b.zmtcdn.com/data/pictures/4/22201254/64f914acf0c3e0b7d8fae5fd85a1d33f_o2_featured_v2.jpg" 
        alt="res-logo"/>

      {/* Using props to display restaurant name and cuisine type */}
      <h3>{props.resName}</h3> 
      <h4>{props.cuisine}</h4> 
        <p>⭐ 4.5 • 35 mins</p>
        <p>₹400 for two</p>
        <p>Barrackpore, Kolkata</p>
    </div>
  )
}

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        <RestaurantCard  // using the RestaurantCard component and passing props to it
          resName="Dada Boudi Biriyani"
          cuisine="Biriyani, Mughlai"
        />
        <RestaurantCard 
          resName="Dominos Pizza"
          cuisine="Italian, Pizza"     
        />
      </div>
    </div>
  )
}

const Applayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Applayout/>);

