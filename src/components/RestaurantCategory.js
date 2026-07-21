import ItemList from "./ItemList";

// A single collapsible category (accordion section). The parent controls
// whether it's open (showItems) and what happens on click, so only one
// category can be open at a time across the whole menu.
const RestaurantCategory = ({ data, showItems, onClick }) => {
  return (
    <div className="w-full bg-white rounded-xl border border-[#e9e9eb] mb-3 overflow-hidden shadow-sm">
      <div
        className="flex justify-between items-center px-5 py-4 cursor-pointer select-none"
        onClick={onClick}
      >
        <span className="font-semibold text-[15px] text-[#1c1c1c]">
          {data.title} ({data.itemCards.length})
        </span>
        <span
          className={`text-[#686b78] transition-transform duration-200 ${
            showItems ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </div>

      {showItems && (
        <div className="px-5 pb-5 border-t border-[#e9e9eb] pt-4">
          <ItemList items={data.itemCards} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;