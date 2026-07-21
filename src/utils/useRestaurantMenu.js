import { useEffect, useState } from "react";
import { resList, menuList, defaultMenu } from "../utils/mockData";

// Combines restaurant info + categorized menu into a single "fetch" so the
// page has one loading state, the same way a real API call would return
// both restaurant details and its menu in one response.
const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    setResInfo(null); // reset while "fetching" new resId

    const timer = setTimeout(() => {
      const found = resList.find((res) => res.info.id === resId);
      const menu = menuList[resId] || defaultMenu;

      setResInfo({
        info: found?.info,
        menu, // array of { title, itemCards: [...] } categories
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;