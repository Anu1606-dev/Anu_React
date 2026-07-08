import RestaurantCard from "./restaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  // State Variable - Super powerful variable which remembers its value between function calls
  const [listOfRestaurants, setListRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // State variable to store the filtered list of restaurants
  const [searchText, setSearchText] = useState(""); // searchText is a state variable and setSearchText is a function to update the value of searchText

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9615398&lng=79.2961468&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    console.log(json);

    //optional chaining operator (?.) is used to avoid errors if any property in the chain is undefined or null
    setListRestaurants(json?.data?.cards[2]?.data?.data?.cards);// optional chaining operator (?.) is used to avoid errors if any property in the chain is undefined or null
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }
  // Conditional Rendering
  // if(listOfRestaurants.length === 0) {
  //   return <Shimmer/>;
  // }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input type="text" className="search-box" 
          placeholder="Search for restaurants and food" 
          value={searchText} 
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          />
          <button 
          onClick={() => {
            console.log(searchText);
            const filteredRestaurants = listOfRestaurants.filter((res) =>
              res.data.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurants(filteredRestaurants);
          }}
          >Search</button>
        </div>
        <button className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => Number(res.info.avgRatingString) > 4.5
            );
            setListRestaurants(filteredList);
          }}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.data.id}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default Body; /* Exported The Body Component */