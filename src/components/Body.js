import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { resList } from "../utils/mockData";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

// Defined once, outside the component, so it isn't recreated on every render
const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

const Body = () => {
  const [listOfRestaurants, setListRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Hooks must always run unconditionally, at the top, in the same order
  // on every render — never after a conditional return.
  const { loggedInUser, setUserInfo } = useContext(UserContext);
  const onlineStatus = useOnlineStatus();

  console.log("Body Rendered", listOfRestaurants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setTimeout(() => {
      setListRestaurants(resList);
      setFilteredRestaurants(resList);
    }, 1500);
  };

  if (!onlineStatus) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl font-semibold">😑😒bhai tu offline hai..</h1>
        <h2 className="text-base text-gray-600">Internet connection check kar le..🚧🛠️</h2>
      </div>
    );
  }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div>
      <div className="flex items-center gap-3 px-5 py-4 bg-[#fafafa] border-b border-[#eee]">
        <div className="flex items-center bg-white border-gray-300 rounded-full overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-[#e8760a] focus-within:border-2">
          <input
            type="text"
            className="border-none outline-none px-4 py-2.5 text-sm w-70 bg-transparent text-gray-800"
            placeholder="Search for restaurants and food"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const filtered = listOfRestaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase()),
                );
                setFilteredRestaurants(filtered);
              }
            }}
          />
          <button
            className="px-5 py-2.5 border-none bg-[#e8760a] text-white text-sm font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#c9620a]"
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setFilteredRestaurants(filtered);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="px-5 py-2.5 cursor-pointer rounded-full border-2 border-[#e8760a] bg-white text-[#e8760a] text-sm font-semibold transition-all duration-200 whitespace-nowrap hover:bg-[#e8760a] hover:text-white"
          onClick={() => {
            const filtered = listOfRestaurants.filter(
              (res) => Number(res.info.avgRatingString) > 4.5,
            );
            setFilteredRestaurants(filtered);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="px-5 py-3">
        <label htmlFor="username" className="mr-2 font-semibold text-gray-700">
          Username:
        </label>
        <input
          id="username"
          className="border border-black p-2"
          value={loggedInUser || ""}
          onChange={(e) => setUserInfo(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-5 p-5 justify-start">
        {filteredRestaurants.map((restaurant) => (
          <Link
            className="no-underline text-inherit"
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            {/* if the restaurant is promoted then show the promoted label over it */}
            {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;