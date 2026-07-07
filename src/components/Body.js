import RestaurantCard from "./restaurantCard";
import { resList } from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  // State Variable - Super powerful variable which remembers its value between function calls
  const [listOfRestaurants, setListRestaurants] = useState(resList);

  return (
    <div className="body">
      <div className="filter">
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
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default Body; /* Exported The Body Component */