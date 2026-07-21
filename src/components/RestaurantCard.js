import { useContext } from "react";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {

  if (!resData?.info) return null;

  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRatingString,
    totalRatingsString,
    costForTwo,
  } = resData.info;

  const imgSrc = cloudinaryImageId?.startsWith("http")
    ? cloudinaryImageId
    : CDN_URL + cloudinaryImageId;

  return (
    <div className="w-55 bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-200 hover:cursor-pointer hover:-translate-y-1 hover:shadow-xl">
      <img className="w-full h-35 object-cover block" src={imgSrc} alt={name} />
      <h3 className="text-[15px] font-bold text-[#1a1a1a] px-3 pt-2.5 pb-1 whitespace-nowrap overflow-hidden text-ellipsis">
        {name}
      </h3>
      <h4 className="text-[13px] text-gray-500 px-3 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
        {cuisines.join(", ")}
      </h4>
      <h4 className="text-[13px] text-gray-500 px-3 py-0.5">⭐ {avgRatingString}</h4>
      <h4 className="text-[13px] text-gray-500 px-3 py-0.5">{totalRatingsString}</h4>
      <h4 className="text-[13px] text-gray-500 px-3 py-0.5">₹{(costForTwo / 100).toFixed(0)} for two</h4>
    </div>
  );
};

// Higher Order Component (HOC): a function that takes a component as an argument and returns a new component. HOCs add extra functionality to a component without modifying the original component's source.
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    const { resData } = props;
    const isPromoted = resData?.info?.promoted;

    return (
      <div className="relative">
        {isPromoted && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            Promoted
          </span>
        )}
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;