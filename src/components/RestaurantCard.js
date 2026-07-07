import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  // Destructuring the restaurant object
  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRatingString,
    totalRatingsString,
    costForTwo,
  } = resData.info;

  return (
    <div
      className="res-card"
      style={{
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
      }}
    >
      {/* Restaurant Image */}
      <img
        className="res-logo"
        src={CDN_URL + cloudinaryImageId}
        alt={name}
      />

      <h3>{name}</h3>

      {/* cuisines is an array, so join() converts it into a string */}
      <h4>{cuisines.join(", ")}</h4>

      <h4>⭐ {avgRatingString}</h4>

      <h4>{totalRatingsString}</h4>

      {/* costForTwo is stored in paise */}
      <h4>₹{costForTwo / 100} FOR TWO</h4>
    </div>
  );
};


export default RestaurantCard; /* Exported The RestaurantCard Component */
