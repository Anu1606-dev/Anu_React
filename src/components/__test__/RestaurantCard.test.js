import { render, screen } from "@testing-library/react";
import RestaurantCard, { withPromotedLabel } from "../RestaurantCard";
import "@testing-library/jest-dom";

it("should render RestaurantCard component with props data", () => {
    const restaurantData = {
        info: {
            id: "123",
            name: "Test Restaurant",
            cuisines: ["Italian", "Pizza"],
            cloudinaryImageId: "test-image.jpg",
            avgRatingString: "4.5",
            totalRatingsString: "1K+ Ratings",
            costForTwo: 50000,
        },
    };

    render(<RestaurantCard resData={restaurantData} />);

    const name = screen.getByText("Test Restaurant");
    expect(name).toBeInTheDocument();

    const rating = screen.getByText("⭐ 4.5");
    expect(rating).toBeInTheDocument();

    const cost = screen.getByText("₹500 for two");
    expect(cost).toBeInTheDocument();
});

it("should render the Promoted label when resData.info.promoted is true", () => {
    const promotedRestaurantData = {
        info: {
            id: "124",
            name: "Promoted Test Restaurant",
            cuisines: ["Biryani", "Mughlai"],
            cloudinaryImageId: "test-image.jpg",
            avgRatingString: "4.7",
            totalRatingsString: "10K+ Ratings",
            costForTwo: 40000,
            promoted: true,
        },
    };

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    render(<RestaurantCardPromoted resData={promotedRestaurantData} />);

    const promotedLabel = screen.getByText("Promoted");
    expect(promotedLabel).toBeInTheDocument();
});

it("should NOT render the Promoted label when resData.info.promoted is false", () => {
    const nonPromotedRestaurantData = {
        info: {
            id: "125",
            name: "Non Promoted Test Restaurant",
            cuisines: ["Pizza", "Italian"],
            cloudinaryImageId: "test-image.jpg",
            avgRatingString: "4.2",
            totalRatingsString: "5K+ Ratings",
            costForTwo: 45000,
            promoted: false,
        },
    };

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    render(<RestaurantCardPromoted resData={nonPromotedRestaurantData} />);

    const promotedLabel = screen.queryByText("Promoted");
    expect(promotedLabel).not.toBeInTheDocument();
});