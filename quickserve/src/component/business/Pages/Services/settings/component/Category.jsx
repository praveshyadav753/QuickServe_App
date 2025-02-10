import React, { useState } from "react";

const Category = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Food",
      price: null,
      availability: {
        Mon: true,
        Tue: true,
        Wed: true,
        Thu: true,
        Fri: true,
        Sat: false,
        Sun: false,
      },
      subcategories: [
        { id: 101, name: "Snacks", price: 50 },
        { id: 102, name: "Beverages", price: 30 },
      ],
    },
    {
      id: 2,
      name: "Electronics",
      price: 2000,
      availability: {
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true,
        Saturday: false,
        Sunday: false,
      },
      subcategories: [],
    },
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState({});
  const [newPrice, setNewPrice] = useState({});

  const addCategory = () => {
    if (newCategory.trim() === "") return;
    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newCategory,
        price: null,
        availability: {
          Monday: true,
          Tuesday: true,
          Wednesday: true,
          Thursday: true,
          Friday: true,
          Saturday: false,
          Sunday: false,
        },
        subcategories: [],
      },
    ]);
    setNewCategory("");
  };

  const addSubcategory = (categoryId) => {
    if (!newSubcategory[categoryId] || newSubcategory[categoryId].trim() === "") return;
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: [
                ...category.subcategories,
                {
                  id: Date.now(),
                  name: newSubcategory[categoryId],
                  price: newPrice[categoryId] || 0,
                },
              ],
            }
          : category
      )
    );
    setNewSubcategory((prev) => ({ ...prev, [categoryId]: "" }));
    setNewPrice((prev) => ({ ...prev, [categoryId]: "" }));
  };

  const deleteCategory = (categoryId) => {
    setCategories((prev) => prev.filter((category) => category.id !== categoryId));
  };

  const deleteSubcategory = (categoryId, subcategoryId) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: category.subcategories.filter((sub) => sub.id !== subcategoryId),
            }
          : category
      )
    );
  };

  const toggleAvailability = (categoryId, day) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              availability: {
                ...category.availability,
                [day]: !category.availability[day],
              },
            }
          : category
      )
    );
  };

  return (
    <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white text-black min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Manage Categories</h2>

      <div className="flex gap-2 mb-4 ">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category Name"
          className="p-2 border rounded dark:bg-gray-800 w-full"
        />
        <button onClick={addCategory} className="bg-blue-500 text-white px-4 py-2 whitespace-nowrap rounded">
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-gray-600 shadow p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <button onClick={() => deleteCategory(category.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>

            <div className="mt-3">
              <h4 className="font-medium">Availability:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.keys(category.availability).map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleAvailability(category.id, day)}
                    className={`px-3 py-1 rounded  ${category.availability[day] ? "bg-green-700" : "bg-gray-400"}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={newSubcategory[category.id] || ""}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, [category.id]: e.target.value })}
                placeholder="Subcategory Name"
                className="p-2 border rounded dark:bg-gray-800 w-full"
              />
              <input
                type="number"
                value={newPrice[category.id] || ""}
                onChange={(e) => setNewPrice({ ...newPrice, [category.id]: e.target.value })}
                placeholder="Price"
                className="p-2 border rounded dark:bg-gray-800  w-24"
              />
              <button onClick={() => addSubcategory(category.id)} className="bg-blue-400 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>

            {category.subcategories.length > 0 && (
              <ul className="mt-3 space-y-2">
                {category.subcategories.map((sub) => (
                  <li key={sub.id} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span>{sub.name} - ₹{sub.price}</span>
                    <button onClick={() => deleteSubcategory(category.id, sub.id)} className="bg-red-400 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
