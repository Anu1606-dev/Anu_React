import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import ItemList from "./ItemList";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="max-w-225 mx-auto px-5 py-6">
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-[#e9e9eb]">
        <h1 className="text-2xl font-bold text-[#1c1c1c]">Your Cart ({cartItems.length})</h1>
        {cartItems.length > 0 && (
          <button
            onClick={handleClearCart}
            className="px-4 py-2 rounded-full border-2 border-red-500 text-red-500 text-sm font-semibold cursor-pointer transition-colors duration-200 hover:bg-red-500 hover:text-white"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <h2 className="text-gray-500 text-center mt-10">
          Your cart is empty. Add some delicious food!
        </h2>
      ) : (
        <ItemList items={cartItems} />
      )}
    </div>
  );
};

export default Cart;