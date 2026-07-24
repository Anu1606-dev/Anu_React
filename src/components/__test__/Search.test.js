import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import Body from "../Body";
import appStore from "../../utils/appStore";

// INTEGRATION TESTING

// Same future flags used in Header.test.js — silences React Router's v7
// deprecation warnings, no functional effect on the tests.
const routerFutureFlags = { v7_startTransition: true, v7_relativeSplatPath: true };

// Body renders <Link> elements (needs a Router) and its child
// RestaurantCard/RestaurantCardPromoted components live in a tree that
// expects a Redux Provider (via the app's real appStore), so both wrap
// every render here — same pattern as Header.test.js.
const renderBody = () => {
  render(
    <BrowserRouter future={routerFutureFlags}>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </BrowserRouter>
  );
};

// Body.js loads mockData.js's resList via a 1500ms setTimeout inside
// fetchData(), simulating a real API call. Using fake timers lets every
// test instantly "skip ahead" past that delay instead of the whole suite
// actually waiting 1.5s per test (this is the "optimised" part — it keeps
// the suite fast and deterministic instead of relying on real delays).
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("Body component - Search feature (Integration Test)", () => {
  it("should show Shimmer (no cards) before mock data has loaded", () => {
    renderBody();

    // fetchData's setTimeout hasn't fired yet, so listOfRestaurants is
    // still empty and Body renders <Shimmer /> instead of any cards.
    // Every restaurant card is wrapped in a <Link>, so 0 links = 0 cards.
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("should render all restaurant cards once mock data has loaded", () => {
    renderBody();

    // Fast-forward past the 1500ms mock "API" delay. Wrapping in act()
    // ensures React finishes the resulting setState + re-render before
    // we query the DOM below.
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    // mockData.js's resList currently has 20 restaurants.
    const restaurantCards = screen.getAllByRole("link");
    expect(restaurantCards.length).toBe(20);
  });

  it("should filter restaurants by name when typing a search term and clicking Search", () => {
    renderBody();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    const searchInput = screen.getByPlaceholderText(
      "Search for restaurants and food"
    );
    const searchButton = screen.getByRole("button", { name: /search/i });

    // "pizza" (case-insensitive, matched against restaurant NAME only —
    // see Body.js's filter logic) matches exactly 2 restaurants in
    // mockData.js: "Domino's Pizza" and "Pizza Hut".
    fireEvent.change(searchInput, { target: { value: "pizza" } });
    fireEvent.click(searchButton);

    const filteredCards = screen.getAllByRole("link");
    expect(filteredCards.length).toBe(2);
  });

  it("should filter restaurants by name when pressing Enter in the search box", () => {
    renderBody();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    const searchInput = screen.getByPlaceholderText(
      "Search for restaurants and food"
    );

    // Body's onKeyDown handler only filters when e.key === "Enter", so we
    // simulate that exact key instead of clicking the Search button.
    // "biryani" matches only "Behrouz Biryani" — note "Dada Boudi Biriyani"
    // is spelled with an extra "i" (Biriyani, not Biryani) so it does NOT
    // match this search term.
    fireEvent.change(searchInput, { target: { value: "biryani" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    const filteredCards = screen.getAllByRole("link");
    expect(filteredCards.length).toBe(1);
  });

  it("should show no restaurant cards when the search text matches nothing", () => {
    renderBody();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    const searchInput = screen.getByPlaceholderText(
      "Search for restaurants and food"
    );
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, {
      target: { value: "this-restaurant-does-not-exist" },
    });
    fireEvent.click(searchButton);

    // The full list (listOfRestaurants) is still 20 restaurants, so Body
    // does NOT fall back to Shimmer here — only filteredRestaurants is
    // empty, meaning the grid renders with zero cards inside it.
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});