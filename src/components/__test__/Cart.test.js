import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import Header from "../Header";
import RestaurantMenu from "../RestaurantMenu";
import Cart from "../Cart";
import appStore from "../../utils/appStore";
import { clearCart } from "../../utils/cartSlice";

// Same future flags used elsewhere — silences React Router v7 deprecation
// warnings, no functional effect on the tests.
const routerFutureFlags = { v7_startTransition: true, v7_relativeSplatPath: true };

// Mirrors the real AppLayout in app.js: Header stays mounted across routes,
// page content swaps via <Outlet />. Using this (instead of rendering
// Header and the page separately) means clicking the real Header "Cart"
// <Link> actually navigates during the test, same as in the real app.
const TestAppLayout = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

const renderApp = (initialRoute) => {
  render(
    <Provider store={appStore}>
      <MemoryRouter initialEntries={[initialRoute]} future={routerFutureFlags}>
        <Routes>
          <Route path="/" element={<TestAppLayout />}>
            <Route path="restaurant/:resId" element={<RestaurantMenu />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

// RestaurantMenu's data comes from useRestaurantMenu, which mocks a 1200ms
// API delay via setTimeout. Fake timers let every test skip past that
// instantly and deterministically instead of actually waiting.
beforeEach(() => {
  jest.useFakeTimers();

  // IMPORTANT: appStore is a real singleton, imported once and shared by
  // every test in this file. Without this reset, cart items added in one
  // test carry over into the next (e.g. test 1 leaves 2 items in the
  // store, so test 2 starts at 2 instead of 0) — causing failures that
  // look like a rendering bug but are actually just leftover state.
  appStore.dispatch(clearCart());
});

afterEach(() => {
  jest.useRealTimers();
});

describe("Cart integration: RestaurantMenu -> Header -> Cart page", () => {
  it("should update the Header cart count when items are added from the menu", () => {
    renderApp("/restaurant/1");

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    // Cart starts empty
    expect(screen.getByText("Cart (0)")).toBeInTheDocument();

    // "Recommended" is open by default (openCategoryIndex = 0 in
    // RestaurantMenu), so its items' "+ ADD" buttons are already visible
    // without needing to click the accordion header first.
    // mockData.js's resId "1" Recommended category = [Chicken Biryani,
    // Mutton Biryani, Veg Biryani], in that order.
    const addButtons = screen.getAllByText("+ ADD");
    fireEvent.click(addButtons[0]); // Chicken Biryani
    fireEvent.click(addButtons[1]); // Mutton Biryani

    expect(screen.getByText("Cart (2)")).toBeInTheDocument();
  });

  it("should show the exact added items on the Cart page after navigating there", () => {
    renderApp("/restaurant/1");

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    const addButtons = screen.getAllByText("+ ADD");
    fireEvent.click(addButtons[0]); // Chicken Biryani
    fireEvent.click(addButtons[2]); // Veg Biryani

    // Navigate the same way a real user would: click the Cart link in Header
    const cartLink = screen.getByText("Cart (2)");
    fireEvent.click(cartLink);

    // Cart page heading reflects the same count, read from the same store
    expect(screen.getByText("Your Cart (2)")).toBeInTheDocument();

    // The specific items added should be visible on the Cart page
    expect(screen.getByText("Chicken Biryani")).toBeInTheDocument();
    expect(screen.getByText("Veg Biryani")).toBeInTheDocument();

    // An item that was never added should NOT appear
    expect(screen.queryByText("Mutton Biryani")).not.toBeInTheDocument();
  });

  it("should clear the cart and reset the Header count when Clear Cart is clicked", () => {
    renderApp("/restaurant/1");

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    const addButtons = screen.getAllByText("+ ADD");
    fireEvent.click(addButtons[0]);

    const cartLink = screen.getByText("Cart (1)");
    fireEvent.click(cartLink);

    const clearCartButton = screen.getByText("Clear Cart");
    fireEvent.click(clearCartButton);

    // Cart page falls back to its empty-state message
    expect(
      screen.getByText("Your cart is empty. Add some delicious food!")
    ).toBeInTheDocument();

    // Header count resets too, since both read from the same store
    expect(screen.getByText("Cart (0)")).toBeInTheDocument();
  });
});