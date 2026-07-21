import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
// import Grocery from "./components/Grocery";

/* ------------------------------ App Layout ------------------------------ */

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  // Authentication Logic
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const data = {
      name: "Anushka Sarkar",
    };
    setUserInfo(data.name);
  }, []); // <-- empty dependency array: run only once, on mount

  return (
    <UserContext.Provider value={{ loggedInUser: userInfo, setUserInfo }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/grocery",
        element: <Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense>,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      }
    ],
  },
]);

/* ------------------------------ React Root ------------------------------ */

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);