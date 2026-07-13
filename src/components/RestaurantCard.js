import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRatingString,
    totalRatingsString,
    costForTwo,
  } = resData?.info;

  // If URL is already absolute (starts with http), use it directly
  // Otherwise prepend CDN_URL (for real Swiggy API data later)
  const imgSrc = cloudinaryImageId?.startsWith("http")
    ? cloudinaryImageId
    : CDN_URL + cloudinaryImageId;

  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}>
      <img
        className="res-logo"
        src={imgSrc}
        alt={name}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>⭐ {avgRatingString}</h4>
      <h4>{totalRatingsString}</h4>
      <h4>₹{(costForTwo / 100).toFixed(0)} for two</h4>
    </div>
  );
};

export default RestaurantCard;