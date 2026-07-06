import RestaurantCard from "./restaurantCard";

const Body = () => {
  // State Variable
  const [listOfRestaurants] = useState(resList);

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