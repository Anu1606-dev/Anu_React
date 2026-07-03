import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

/* -------------------- Restaurant Image CDN -------------------- */

const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

/* -------------------- Dummy Restaurant Data -------------------- */
/*
  This data follows the same structure as the Swiggy API.
  Later, when you learn API fetching, you'll simply replace
  this resList with the API response.
*/

const resList = [
  {
    info: {
      id: "1",
      name: "Dada Boudi Biriyani",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/1/9/54c6e4bd-d8a9-4a8c-bda5-0af89815bb8b_893093.JPG",
      cuisines: ["Biryani", "Mughlai"],
      avgRatingString: "4.6",
      totalRatingsString: "25K+ Ratings",
      costForTwo: 40000,
    },
  },

  {
    info: {
      id: "2",
      name: "Domino's Pizza",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/13/4d0b3f2e-7782-463f-b6bc-177d15f24af3_486826.JPG",
      cuisines: ["Pizza", "Italian"],
      avgRatingString: "4.4",
      totalRatingsString: "10K+ Ratings",
      costForTwo: 50000,
    },
  },

  {
    info: {
      id: "3",
      name: "KFC",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2024/12/9/e6e7c31d-7dd6-44d8-b4c8-b4f2eb8571f8_1011340.JPG",
      cuisines: ["Burger", "Fast Food"],
      avgRatingString: "4.3",
      totalRatingsString: "18K+ Ratings",
      costForTwo: 60000,
    },
  },

  {
    info: {
      id: "4",
      name: "Burger King",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/18/9b5c2f96-47d7-4636-bb09-fbb66555b610_57799.jpg",
      cuisines: ["Burger", "American"],
      avgRatingString: "4.2",
      totalRatingsString: "15K+ Ratings",
      costForTwo: 45000,
    },
  },

  {
    info: {
      id: "5",
      name: "Wow! Momo",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/30/ef6f16d7-f8dd-4743-bb7d-f0d80ee6d0d7_10575.jpg",
      cuisines: ["Momos", "Chinese"],
      avgRatingString: "4.5",
      totalRatingsString: "20K+ Ratings",
      costForTwo: 35000,
    },
  },

  {
    info: {
      id: "6",
      name: "Subway",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/12/2a5c8f59-9b79-41f3-a8b4-0fdbbfbf5a68_32129.jpg",
      cuisines: ["Healthy", "Sandwich"],
      avgRatingString: "4.4",
      totalRatingsString: "8K+ Ratings",
      costForTwo: 45000,
    },
  },

  {
    info: {
      id: "7",
      name: "Pizza Hut",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/9/14f3db2d-fb4b-4955-9fc0-67df7bffdb3d_7218.jpg",
      cuisines: ["Pizza", "Pasta"],
      avgRatingString: "4.1",
      totalRatingsString: "9K+ Ratings",
      costForTwo: 55000,
    },
  },

  {
    info: {
      id: "8",
      name: "Baskin Robbins",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/2/13/5d3f38e6-feb0-4d0f-8d1f-f57f2d0c08f8_91089.jpg",
      cuisines: ["Ice Cream", "Desserts"],
      avgRatingString: "4.7",
      totalRatingsString: "5K+ Ratings",
      costForTwo: 30000,
    },
  },

  {
    info: {
      id: "9",
      name: "The Belgian Waffle Co.",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/1/17/9fdab14d-fb1e-46dd-90e6-97f1e8721c72_57963.JPG",
      cuisines: ["Waffles", "Desserts"],
      avgRatingString: "4.8",
      totalRatingsString: "12K+ Ratings",
      costForTwo: 35000,
    },
  },

  {
    info: {
      id: "10",
      name: "Haldiram's",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/5/15/8cbff0fb-93d0-4313-a1ec-5d80e5f6b677_4321.jpg",
      cuisines: ["North Indian", "Snacks"],
      avgRatingString: "4.5",
      totalRatingsString: "22K+ Ratings",
      costForTwo: 50000,
    },
  },
];

/* ----------------------------- Header Component ----------------------------- */

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://static.vecteezy.com/system/resources/previews/011/401/427/non_2x/food-signal-online-food-ordering-logo-design-order-food-on-internet-restaurant-cafe-meals-delivery-online-free-vector.jpg"
          alt="Logo"
        />
      </div>

      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

/* -------------------------- Restaurant Card -------------------------- */

const RestaurantCard = ({ resData }) => {
  // Destructuring the restaurant object
  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRatingString,
    totalRatingsString,
    costForTwo,
  } = resData.info;

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

      <h4>⭐ {avgRatingString}</h4>

      <h4>{totalRatingsString}</h4>

      {/* costForTwo is stored in paise */}
      <h4>₹{costForTwo / 100} FOR TWO</h4>
    </div>
  );
};

/* ------------------------------ Body Component ------------------------------ */

const Body = () => {
  // State Variable
  const [listOfRestaurants] = useState(resList);

  return (
    <div className="body">
      <div className="search">Search</div>

      <div className="res-container">
        {/* map() creates one RestaurantCard for each restaurant */}

        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

/* ------------------------------ App Layout ------------------------------ */

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

/* ------------------------------ React Root ------------------------------ */

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);