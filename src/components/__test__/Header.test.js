import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Header from "../Header";
import appStore from "../../utils/appStore";

// Header uses <Link> (needs a Router context) and useSelector (needs a Redux
// Provider), so every test below has to wrap <Header /> in both — otherwise
// React would throw "useSelector must be used within a Provider" or similar
// router-context errors.

// These future flags just opt in early to React Router v7 behavior.
// Without them, React Router prints deprecation warnings on every render
// (harmless, but noisy in test output). Passing this silences them.
const routerFutureFlags = { v7_startTransition: true, v7_relativeSplatPath: true };

// UNIT TESTING

describe("Header component test cases", () => {
    // Test 1: basic render check — does the Header show a "Login" button
    // by default (before any click happens)?
    it("should render Header component with a login button", () => {
        render(
            <BrowserRouter future={routerFutureFlags}>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );

        // getByText throws if no match is found, so this doubles as an
        // existence check — if "Login" isn't there, the test fails here.
        const loginButton = screen.getByText("Login");
        expect(loginButton).toBeInTheDocument();
    });

    // Test 2: checks the cart count badge in the Header.
    // appStore starts with an empty cart (items: []), so it should read "Cart (0)".
    // If you add items via addItem before this render, this text would change,
    // so this test relies on appStore's cart slice being freshly initialized.
    it("should render Cart component with 0 cart items", () => {
        render(
            <BrowserRouter future={routerFutureFlags}>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );

        const cartItems = screen.getByText("Cart (0)");
        expect(cartItems).toBeInTheDocument();
    });

    // Test 3: simulates a real user clicking the Login button and checks
    // that it toggles to "Logout".
    it("should change the login button into logout", () => {
        render(
            <BrowserRouter future={routerFutureFlags}>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );

        const loginButton = screen.getByText("Login");

        // IMPORTANT: use fireEvent.click (not loginButton.click()).
        // fireEvent wraps the click in React's act(), which forces React to
        // finish processing the resulting setState + re-render before the
        // next line runs. Calling the raw DOM .click() skips that guarantee,
        // so the assertion below could run against a stale, pre-update DOM
        // and fail intermittently — this bit us before, hence this note.
        fireEvent.click(loginButton);

        const logoutButton = screen.getByText("Logout");
        expect(logoutButton).toBeInTheDocument();
    });
});