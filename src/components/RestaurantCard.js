import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  // Destructuring the restaurant object
  const {
    name,
    cuisines,
    cloudinaryImageId,
    locality,
    areaName,
    avgRating,
    totalRatingsString,
    costForTwo,
    sla,
  } = resData?.data;

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
      <h4>⭐ {avgRating}</h4>
      <h4>{totalRatingsString}</h4>
      <h4>{locality}</h4>
      <h4>{areaName}</h4>
      <h4>₹{costForTwo} FOR TWO</h4>
      <h4>Delivery Time: {sla?.slaString} </h4>
    </div>
  );
};


export default RestaurantCard; /* Exported The RestaurantCard Component */
