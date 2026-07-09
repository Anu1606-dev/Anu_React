import RestaurantCard from "./RestaurantCard";
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
      "https://corsproxy.io/?url=https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=22.7274124&lng=88.46665860000002&carousel=true&third_party_vendor=1"
    );  // added CORS proxy to avoid CORS error while fetching data from Swiggy API

    const json = await data.json();

    //optional chaining operator (?.) is used to avoid errors if any property in the chain is undefined or null
    setListRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
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
              (res) => Number(res.data.avgRating) > 4.5
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