import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { resList, menuList, defaultMenu } from "../utils/mockData";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    setRestaurant(null);
    const timer = setTimeout(() => {
      const found = resList.find((res) => res.info.id === resId);
      setRestaurant(found);
    }, 1500);

    return () => clearTimeout(timer);
  }, [resId]);

  if (restaurant === null) return <Shimmer />;

  const { name, cuisines, avgRatingString, totalRatingsString, costForTwo } =
    restaurant.info;

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