import { useEffect, useState } from "react";
import { resList } from "../utils/mockData";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    setResInfo(null); // reset while "fetching" new resId
    const timer = setTimeout(() => {
      const found = resList.find((res) => res.info.id === resId);
      setResInfo(found);
    }, 1500);

    return () => clearTimeout(timer);
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;