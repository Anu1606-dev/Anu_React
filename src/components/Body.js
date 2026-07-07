import RestaurantCard from "./restaurantCard";
import { resList } from "../utils/mockData";

const Body = () => {
  // State Variable
  const listOfRestaurants = resList;

  return (
    <div className="body">
      <div className="search">Search</div>

      <div className="res-container">
        {/* map() creates one RestaurantCard for each restaurant */}

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