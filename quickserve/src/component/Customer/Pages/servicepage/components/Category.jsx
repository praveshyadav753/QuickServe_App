import React from "react";
import { useNavigate } from "react-router";

const categories = [
  { id: 1, name: "Beauty & Wellness", image: "/beauty.png" },
  { id: 2, name: "Home Cleaning", image: "/Homecleaning.png" },
  { id: 3, name: "Repairs & Maintenance", image: "repair.png" },
  { id: 4, name: "Appliance Services", image: "appliance.png" },
  { id: 5, name: "Health & Fitness", image: "Fitness.png" },
  { id: 6, name: "Walls and Rooms painting ", image: "paint.png" },
  {id: 7, name:"electrician,plumber and carpenters", image: "carpenter.png" },
];

const Categories = () => {
 const navigate=useNavigate();
  return (
    <div className="w-full bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Select a Category</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            style={{ backgroundImage: `url(${category.image})`,  backgroundSize: "cover" ,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"}}
            className="bg-blue-300 h-40 text-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition transform duration-300  "
            onClick={() => navigate('/subcategory')}
          >
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
  
            {/* <img src={category} alt={category.name} className="w-full h-40 object-cover text-white" /> */}
            <div className="p-4 w-full text-center text-white absolute bottom-0 ">
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
