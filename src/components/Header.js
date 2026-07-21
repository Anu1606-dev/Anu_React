import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center px-5 h-20 bg-white shadow-md sticky top-0 z-50">
      <div>
        <img className="w-17.5 h-17.5 object-contain" src={LOGO_URL} alt="Logo" />
      </div>

      <div>
        <ul className="list-none flex items-center gap-1 text-base font-medium">
          <li className="cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 text-gray-800 hover:bg-gray-100 hover:text-[#e8760a]">
            <Link className="no-underline text-inherit" to="/">
              Online Status: {onlineStatus ? "❤️✅" : "💔😩"}
            </Link>
          </li>
          <li className="cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 text-gray-800 hover:bg-gray-100 hover:text-[#e8760a]">
            <Link className="no-underline text-inherit" to="/">Home</Link>
          </li>
          <li className="cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 text-gray-800 hover:bg-gray-100 hover:text-[#e8760a]">
            <Link className="no-underline text-inherit" to="/about">About</Link>
          </li>
          <li className="cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 text-gray-800 hover:bg-gray-100 hover:text-[#e8760a]">
            <Link className="no-underline text-inherit" to="/contact">Contact</Link>
          </li>
          <li className="cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 text-gray-800 hover:bg-gray-100 hover:text-[#e8760a]">
            <Link className="no-underline text-inherit" to="/grocery">Grocery</Link>
          </li>
          <li className="cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 text-gray-800 hover:bg-gray-100 hover:text-[#e8760a]">
            <Link className="no-underline text-inherit" to="/cart">Cart</Link>
          </li>
          <button
            className="px-5 py-2 ml-2 cursor-pointer rounded-full border-2 border-[#e8760a] bg-white text-[#e8760a] text-[15px] font-semibold transition-all duration-200 hover:bg-[#e8760a] hover:text-white"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
          <li className="px-4 font-bold">{loggedInUser}</li>

        </ul>
      </div>
    </div>
  );
};

export default Header;