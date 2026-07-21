const ItemList = ({ items }) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div
          className="flex justify-between items-center gap-5 p-4 border border-[#e9e9eb] rounded-xl bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          key={item.id}
        >
          <div
            className={`w-3 h-3 border flex items-center justify-center shrink-0 ${
              item.isVeg ? "border-green-600" : "border-red-600"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`}></div>
          </div>

          <div className="flex-1 order-1">
            <h3 className="text-base text-[#1c1c1c] mb-1.5">{item.name}</h3>
            <p className="font-semibold text-sm text-[#3d4152] mb-2">₹{item.price / 100}</p>
            <p className="text-[13px] text-[#93959f] leading-relaxed max-w-120">{item.description}</p>
          </div>

          <img
            className="w-25 h-25 object-cover rounded-[10px] shrink-0 order-2"
            src={item.imageId}
            alt={item.name}
          />
        </div>
      ))}
    </div>
  );
};

export default ItemList;