import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRatingString,       // ✅ was avgRating
    totalRatingsString,
    costForTwo,
  } = resData?.info;       // ✅ was resData?.data

  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}>
      <img
        className="res-logo"
        src={CDN_URL + cloudinaryImageId}
        alt={name}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>⭐ {avgRatingString}</h4>
      <h4>{totalRatingsString}</h4>
      <h4>₹{(costForTwo / 100).toFixed(0)} for two</h4>  {/* costForTwo is in paise */}
    </div>
  );
};

export default RestaurantCard;