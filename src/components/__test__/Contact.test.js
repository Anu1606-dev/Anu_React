import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us page test cases", () => { // grouping related tests
    // we can write "test" or "it" for writing test cases
    it("should render Contact component without crashing", () => {
        render(<Contact />);
        // Query writing / Querying the DOM for the heading element with the text "Contact Us"
        const heading = screen.getByRole("heading", { name: /Contact Us/i });
        expect(heading).toBeInTheDocument();
    });

    it("should load button component inside Contact component", () => {
        render(<Contact />);
        const button = screen.getByRole("button", { name: /Submit/i });
        expect(button).toBeInTheDocument();
    });

    it("should load button component inside Contact component", () => {
        render(<Contact />);
        const submit = screen.getByText(/Submit/i);
        expect(submit).toBeInTheDocument();
    });

    it("should render name input box", () => {
        render(<Contact />);
        const nameInput = screen.getByLabelText(/Name/i);
        expect(nameInput).toBeInTheDocument();
    });

    it("should load 3 input boxes", () => {
        render(<Contact />);
        const nameInput = screen.getByLabelText(/Name/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const messageInput = screen.getByLabelText(/Message/i);
        const inputBoxes = screen.getAllByRole("textbox");

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(messageInput).toBeInTheDocument();
        expect(inputBoxes.length).toBe(3);
    });
})

