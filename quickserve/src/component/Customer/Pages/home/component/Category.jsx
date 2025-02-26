import React from "react";

const categories = [
  { id: 1, name: "Beauty & Wellness", image: "https://source.unsplash.com/400x300/?beauty,spa" },
  { id: 2, name: "Home Cleaning", image: "https://source.unsplash.com/400x300/?cleaning,house" },
  { id: 3, name: "Repairs & Maintenance", image: "https://source.unsplash.com/400x300/?tools,repair" },
  { id: 4, name: "Appliance Services", image: "https://source.unsplash.com/400x300/?electronics,appliances" },
  { id: 5, name: "Health & Fitness", image: "https://source.unsplash.com/400x300/?fitness,gym" },
  { id: 6, name: "Pest Control", image: "https://source.unsplash.com/400x300/?pest,control" },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Select a Category</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition transform duration-300"
            onClick={() => alert(`You selected ${category.name}`)}
          >
            <img src={category.image} alt={category.name} className="w-full h-40 object-cover" />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
