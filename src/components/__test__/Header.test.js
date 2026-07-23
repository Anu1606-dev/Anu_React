import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Header from "../Header";
import appStore from "../../utils/appStore";

describe("Header component test cases", () => {
    it("should render Header component with a login button", () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );

        const loginButton = screen.getByText("Login");
        expect(loginButton).toBeInTheDocument();
    });

    it("should render Cart component with 0 cart items", () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );

        const cartItems = screen.getByText("Cart (0)");
        expect(cartItems).toBeInTheDocument();
    });

    it("should change the login button into logout", () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );

        const loginButton = screen.getByText("Login");
        fireEvent.click(loginButton);
        const logoutButton = screen.getByText("Logout");
        expect(logoutButton).toBeInTheDocument();
    });
});