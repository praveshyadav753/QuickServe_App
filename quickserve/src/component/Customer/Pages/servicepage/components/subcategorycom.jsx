import React from "react";
import { useNavigate } from "react-router";

// 

const SubcategoryCompo = ({subcatagories}) => {
  // console.log(subcatagories)
 const navigate=useNavigate();
    const viewdetails =(subcategory_id)=>
    {
        navigate('/serviceDetail/'+subcategory_id);
    };

  return (
    <div className="w-full bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Select a SubCategory</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {subcatagories?.map((subcategory) => (
         
          <div
            key={subcategory.subcategory_id}
            style={{ backgroundImage: `url(${subcategory.image_url})`,  backgroundSize: "cover" ,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"}}
            className="bg-blue-300 h-40 text-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition transform duration-300  "
            onClick={()=>viewdetails(subcategory.subcategory_id)}
          >
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
  
            {/* <img src={category} alt={category.name} className="w-full h-40 object-cover text-white" /> */}
            <div className="p-4 w-full text-center text-white absolute bottom-0 ">
              <h2 className="text-xl font-semibold">{subcategory.subcategory_name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryCompo;
