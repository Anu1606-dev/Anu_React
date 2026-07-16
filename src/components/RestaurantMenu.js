import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { menuList, defaultMenu } from "../utils/mockData";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId); // pass resId in!

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, avgRatingString, totalRatingsString, costForTwo } =
    resInfo.info;

  const items = menuList[resId] || defaultMenu;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h3>{cuisines.join(", ")}</h3>
      <p>
        ⭐ {avgRatingString} ({totalRatingsString}) · ₹{costForTwo / 100} for two
      </p>

      <h2>Menu</h2>
      <div className="menu-items-container">
        {items.map((item) => (
          <div className="menu-item-card" key={item.id}>
            <div className={item.isVeg ? "veg-icon" : "nonveg-icon"}></div>
            <img className="menu-item-img" src={item.imageId} alt={item.name} />
            <div className="menu-item-details">
              <h3>{item.name}</h3>
              <p className="menu-item-price">₹{item.price / 100}</p>
              <p className="menu-item-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;