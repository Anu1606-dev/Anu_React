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

export default RestaurantCard;