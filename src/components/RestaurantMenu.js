import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  // Index of the currently open accordion category. Start with 0 so
  // "Recommended" (always the first category) is open by default.
  const [openCategoryIndex, setOpenCategoryIndex] = useState(0);

  if (resInfo === null) return <Shimmer />;
  if (!resInfo.info) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl font-semibold">Restaurant not found</h1>
      </div>
    );
  }

  const { name, cuisines, avgRatingString, totalRatingsString, costForTwo } = resInfo.info;
  const categories = resInfo.menu;

  return (
    <div className="max-w-225 mx-auto px-5 py-6">
      <div className="mb-6 pb-5 border-b border-[#e9e9eb]">
        <h1 className="text-[28px] font-bold text-[#1c1c1c] mb-1.5">{name}</h1>
        <h3 className="font-medium text-[#686b78] mb-2">{cuisines.join(", ")}</h3>
        <div className="flex items-center gap-2 text-sm text-[#3d4152]">
          <span className="flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded font-semibold text-xs">
            ⭐ {avgRatingString}
          </span>
          <span className="text-[#93959f]">({totalRatingsString})</span>
          <span className="text-[#93959f]">·</span>
          <span>₹{costForTwo / 100} for two</span>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 text-[#1c1c1c]">Menu</h2>

      <div className="flex flex-col">
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category.title}
            data={category}
            showItems={index === openCategoryIndex}
            onClick={() =>
              setOpenCategoryIndex(index === openCategoryIndex ? null : index)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;