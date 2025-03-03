import React, { useState } from "react";
import { Edit, Trash, PlusCircle, Check, X } from "lucide-react";

const initialData = {
  categories: [
    {
      id: 1,
      name: "Technology",
      image: "https://th.bing.com/th/id/OIP.Pneh22uyXw_rJ8leBae8VwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7",
      subcategories: [
        { id: 1, name: "Software", image: "https://th.bing.com/th/id/OIP.Pneh22uyXw_rJ8leBae8VwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7" },
        { id: 2, name: "Cloud Services", image: "https://th.bing.com/th/id/OIP.Pneh22uyXw_rJ8leBae8VwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7" },
        { id: 3, name: "Security", image: "https://th.bing.com/th/id/OIP.Pneh22uyXw_rJ8leBae8VwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7" },
      ],
    },
    {
      id: 2,
      name: "Health & Wellness",
      image: "https://th.bing.com/th/id/OIP.Pneh22uyXw_rJ8leBae8VwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7",
      subcategories: [
        { id: 4, name: "Fitness", image: "https://th.bing.com/th/id/OIP.Pneh22uyXw_rJ8leBae8VwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7" },
        { id: 5, name: "Nutrition", image: "https://th.bing.com/th/id/OIP.Pneh22uyXw_rJ8leBae8VwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7" },
        { id: 6, name: "Mental Health", image: "https://th.bing.com/th/id/OIP.Pneh22uyXw_rJ8leBae8VwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7" },
      ],
    },
  ],
};

const CatandsubcatPage = () => {
  const [data, setData] = useState(initialData);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [categoryEditValue, setCategoryEditValue] = useState("");
  const [subcategoryEditValue, setSubcategoryEditValue] = useState("");
  const [imageEditValue, setImageEditValue] = useState("");
  const [subcatImageEditValue, setSubcatImageEditValue] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newSubcategoryImage, setNewSubcategoryImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Add a new category
  const handleAddCategory = () => {
    if (newCategory && newCategoryImage) {
      setData((prevState) => ({
        ...prevState,
        categories: [
          ...prevState.categories,
          { id: Date.now(), name: newCategory, image: newCategoryImage, subcategories: [] },
        ],
      }));
      setNewCategory("");
      setNewCategoryImage("");
    }
  };

  // Add a new subcategory
  const handleAddSubcategory = () => {
    if (selectedCategory && newSubcategory && newSubcategoryImage) {
      setData((prevState) => ({
        ...prevState,
        categories: prevState.categories.map((cat) =>
          cat.id === selectedCategory
            ? {
                ...cat,
                subcategories: [
                  ...cat.subcategories,
                  { id: Date.now(), name: newSubcategory, image: newSubcategoryImage },
                ],
              }
            : cat
        ),
      }));
      setNewSubcategory("");
      setNewSubcategoryImage("");
    }
  };

  // Edit a category
  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setCategoryEditValue(category.name);
    setImageEditValue(category.image);
  };

  // Save edited category
  const handleSaveCategory = (id) => {
    setData((prevState) => ({
      ...prevState,
      categories: prevState.categories.map((cat) =>
        cat.id === id ? { ...cat, name: categoryEditValue, image: imageEditValue } : cat
      ),
    }));
    setEditingCategory(null);
  };

  // Edit a subcategory
  const handleEditSubcategory = (categoryId, subcategory) => {
    setEditingSubcategory({ categoryId, subcategory: subcategory.name });
    setSubcategoryEditValue(subcategory.name);
    setSubcatImageEditValue(subcategory.image);
  };

  // Save edited subcategory
  const handleSaveSubcategory = (categoryId, oldSub) => {
    setData((prevState) => ({
      ...prevState,
      categories: prevState.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.map((sub) =>
                sub.name === oldSub
                  ? { ...sub, name: subcategoryEditValue, image: subcatImageEditValue }
                  : sub
              ),
            }
          : cat
      ),
    }));
    setEditingSubcategory(null);
  };

  return (
    <div className="p-6 min-h-screen space-y-6 bg-gray-100 text-gray-900 dark:bg-[#1f253b] dark:text-gray-200">
      <h3 className="text-xl font-semibold">Manage Categories & Subcategories</h3>
      <div className="p-6">
        {/* Add New Category Section */}
        <div className="mb-6 p-4 rounded-md shadow-md bg-gray-200 dark:bg-[#2e334b]">
          <h4 className="text-lg font-semibold mb-2">Add New Category</h4>
          <div className="flex gap-2">
            <input
              type="text"
              className="p-2 rounded text-black dark:text-gray-200"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <input
              type="text"
              className="p-2 rounded text-black dark:text-gray-200"
              placeholder="Image URL"
              value={newCategoryImage}
              onChange={(e) => setNewCategoryImage(e.target.value)}
            />
            <button
              className="bg-green-500 p-2 rounded text-white"
              onClick={handleAddCategory}
            >
              <PlusCircle size={18} />
            </button>
          </div>
        </div>

        {/* Add New Subcategory Section */}
        <div className="mb-6 p-4 rounded-md shadow-md bg-gray-200 dark:bg-[#2e334b]">
          <h4 className="text-lg font-semibold mb-2">Add New Subcategory</h4>
          <div className="flex gap-2">
            <select
              className="p-2 rounded dark:text-gray-200 dark:bg-[#2e334b] text-black"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              <option value="">Select Category</option>
              {data.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="p-2 rounded text-black dark:text-gray-200"
              placeholder="Subcategory Name"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
            />
            <input
              type="text"
              className="p-2 rounded text-black dark:text-gray-200"
              placeholder="Image URL"
              value={newSubcategoryImage}
              onChange={(e) => setNewSubcategoryImage(e.target.value)}
            />
            <button
              className="bg-green-500 p-2 rounded text-white"
              onClick={handleAddSubcategory}
            >
              <PlusCircle size={18} />
            </button>
          </div>
        </div>

        {/* Display Categories and Subcategories */}
        {data.categories.map((category) => (
          <div key={category.id} className="p-4 rounded-md shadow-md mb-4 bg-gray-200 dark:bg-[#2e334b]">
            <div className="flex justify-between items-center mb-2">
              {editingCategory === category.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="p-2 rounded text-black"
                    value={categoryEditValue}
                    onChange={(e) => setCategoryEditValue(e.target.value)}
                  />
                  <input
                    type="text"
                    className="p-2 rounded text-black"
                    value={imageEditValue}
                    onChange={(e) => setImageEditValue(e.target.value)}
                  />
                  <button
                    className="bg-green-500 p-2 rounded text-white"
                    onClick={() => handleSaveCategory(category.id)}
                  >
                    <Check size={18} />
                  </button>
                  <button
                    className="bg-gray-500 p-2 rounded text-white"
                    onClick={() => setEditingCategory(null)}
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <img src={category.image} alt={category.name} className="w-12 h-12 rounded-md" />
                  <h4 className="text-lg font-semibold">{category.name}</h4>
                  <button
                    className="text-blue-500"
                    onClick={() => handleEditCategory(category)}
                  >
                    <Edit size={18} />
                  </button>
                </div>
              )}
            </div>
            <div className="ml-4">
              <h5 className="font-semibold p-2">Subcategories:</h5>
              <ul className="list-disc ml-5">
                {category.subcategories.map((subcategory) => (
                  <li
                    key={subcategory.id}
                    className={`flex justify-between items-center px-2 py-1 rounded ${
                      editingSubcategory?.categoryId === category.id &&
                      editingSubcategory.subcategory === subcategory.name
                        ? "bg-gray-300 dark:bg-[#1f253b]"
                        : ""
                    }`}
                  >
                    {editingSubcategory?.categoryId === category.id &&
                    editingSubcategory.subcategory === subcategory.name ? (
                      <>
                        <input
                          type="text"
                          className="p-2 rounded text-black"
                          value={subcategoryEditValue}
                          onChange={(e) => setSubcategoryEditValue(e.target.value)}
                        />
                        <input
                          type="text"
                          className="p-2 rounded text-black"
                          value={subcatImageEditValue}
                          onChange={(e) => setSubcatImageEditValue(e.target.value)}
                        />
                        <button
                          className="text-green-500"
                          onClick={() => handleSaveSubcategory(category.id, subcategory.name)}
                        >
                          <Check size={14} />
                        </button>
                        <button
                          className="text-gray-500"
                          onClick={() => setEditingSubcategory(null)}
                        >
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <img src={subcategory.image} alt={subcategory.name} className="w-8 h-8 rounded-md" />
                        {subcategory.name}
                        <button
                          className="text-blue-500"
                          onClick={() => handleEditSubcategory(category.id, subcategory)}
                        >
                          <Edit size={14} />
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatandsubcatPage;