import React, { useState } from "react";
import { Edit, Trash, PlusCircle, Check, X } from "lucide-react";
import useApi from "../../../apihook";
import usePostApi from "../../../usePostApi";
import Loader from "../../Customer/Pages/loader/loader.jsx";

const CatandsubcatPage = () => {
  const { loading, data, error, refresh } = useApi("adminpanel/get/cat&subcat/");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newItem, setNewItem] = useState({
    category: { category_name: "", image_url: "" },
    subcategory: { subcategory_name: "", image_url: "", category: "" },
  });
  const [editing, setEditing] = useState({
    category: null,
    subcategory: null,
  });

  const resetForm = (type) => {
    setNewItem(prev => ({ 
      ...prev, 
      [type]: type === 'category' 
        ? { category_name: "", image_url: "" } 
        : { subcategory_name: "", image_url: "", category: selectedCategory }
    }));
  };

  const validateInput = (item, type) => {
    if (type === 'subcategory') {
      return item.subcategory_name?.trim() && item.image_url?.trim() && item.category;
    }
    return item.category_name?.trim() && item.image_url?.trim();
  };

  const handleAddCategory = async () => {
    if (!validateInput(newItem.category, 'category')) return;
    
    try {
      const { postData } = usePostApi("adminpanel/add/category/");
      await postData(newItem.category);
      refresh();
      resetForm("category");
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleAddSubcategory = async () => {
    if (!selectedCategory || !validateInput(newItem.subcategory, 'subcategory')) return;
    
    try {
      const { postData } = usePostApi("adminpanel/add/subcategory/");
      await postData({
        ...newItem.subcategory,
        category: selectedCategory
      });
      refresh();
      resetForm("subcategory");
    } catch (err) {
      console.error("Error adding subcategory:", err);
    }
  };

  const handleEdit = async (type, id, updates) => {
    try {
      const { postData } = usePostApi(`adminpanel/update/${type}/`);
      await postData({ id, ...updates });
      refresh();
      setEditing({ ...editing, [type]: null });
    } catch (err) {
      console.error(`Error updating ${type}:`, err);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      const { postData } = usePostApi(`adminpanel/delete/${type}/`);
      await postData({ id });
      refresh();
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
  };

  const toggleCategory = (id) => {
    setSelectedCategory(prev => (prev === id ? null : id));
  };

  const toggleEdit = (type, item) => {
    setEditing(prev => ({
      ...prev,
      [type]: item ? { ...item } : null,
    }));
  };

  if (loading) return <Loader />;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-[#1f253b] text-gray-900 dark:text-gray-200">
      <h3 className="text-xl font-semibold mb-6">Manage Categories & Subcategories</h3>

      {/* Add Category Form */}
      <div className="mb-8 p-4 bg-white dark:bg-[#2e334b] rounded-lg shadow">
        <h4 className="text-lg font-medium mb-3">Add New Category</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            className="flex-1 p-2 rounded border dark:border-gray-600 dark:bg-[#1f253b]"
            placeholder="Category Name"
            value={newItem.category.category_name}
            onChange={(e) =>
              setNewItem(prev => ({
                ...prev,
                category: { ...prev.category, category_name: e.target.value },
              }))
            }
          />
          <input
            type="text"
            className="flex-1 p-2 rounded border dark:border-gray-600 dark:bg-[#1f253b]"
            placeholder="Image URL"
            value={newItem.category.image_url}
            onChange={(e) =>
              setNewItem(prev => ({
                ...prev,
                category: { ...prev.category, image_url: e.target.value },
              }))
            }
          />
          <button
            className="bg-green-500 hover:bg-green-600 p-2 rounded text-white flex items-center justify-center gap-1"
            onClick={handleAddCategory}
            disabled={!validateInput(newItem.category, 'category')}
          >
            <PlusCircle size={18} /> Add
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {data.map((category) => (
          <div
            key={category.category_id}
            className="bg-white dark:bg-[#2e334b] rounded-lg shadow-md overflow-hidden"
          >
            {/* Category Header */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3a4057]"
              onClick={() => toggleCategory(category.category_id)}
            >
              <div className="flex items-center gap-3">
                {category.image_url && (
                  <img
                    src={category.image_url}
                    alt={category.category_name}
                    className="w-10 h-10 rounded object-cover"
                  />
                )}
                {editing.category?.category_id === category.category_id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 p-1 border rounded dark:bg-[#1f253b]"
                      value={editing.category.category_name}
                      onChange={(e) =>
                        setEditing(prev => ({
                          ...prev,
                          category: { ...prev.category, category_name: e.target.value },
                        }))
                      }
                    />
                    <input
                      type="text"
                      className="flex-1 p-1 border rounded dark:bg-[#1f253b]"
                      value={editing.category.image_url}
                      onChange={(e) =>
                        setEditing(prev => ({
                          ...prev,
                          category: { ...prev.category, image_url: e.target.value },
                        }))
                      }
                    />
                  </div>
                ) : (
                  <h4 className="text-lg font-semibold">{category.category_name}</h4>
                )}
              </div>
              <div className="flex gap-2">
                {editing.category?.category_id === category.category_id ? (
                  <>
                    <button
                      className="p-1 text-green-500 hover:bg-green-100 dark:hover:bg-green-900 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit("category", category.category_id, {
                          category_name: editing.category.category_name,
                          image_url: editing.category.image_url,
                        });
                      }}
                    >
                      <Check size={18} />
                    </button>
                    <button
                      className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEdit("category", null);
                      }}
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEdit("category", category);
                      }}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete("category", category.category_id);
                      }}
                    >
                      <Trash size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {selectedCategory === category.category_id && (
              <div className="p-4 border-t dark:border-gray-700">
                <h5 className="font-semibold mb-3">Subcategories</h5>
                
                {/* Add Subcategory Form */}
                <div className="mb-4 flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    className="flex-1 p-2 rounded border dark:border-gray-600 dark:bg-[#1f253b]"
                    placeholder="Subcategory Name"
                    value={newItem.subcategory.subcategory_name}
                    onChange={(e) =>
                      setNewItem(prev => ({
                        ...prev,
                        subcategory: { ...prev.subcategory, subcategory_name: e.target.value },
                      }))
                    }
                  />
                  <input
                    type="text"
                    className="flex-1 p-2 rounded border dark:border-gray-600 dark:bg-[#1f253b]"
                    placeholder="Image URL"
                    value={newItem.subcategory.image_url}
                    onChange={(e) =>
                      setNewItem(prev => ({
                        ...prev,
                        subcategory: { ...prev.subcategory, image_url: e.target.value },
                      }))
                    }
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white flex items-center justify-center gap-1"
                    onClick={handleAddSubcategory}
                    disabled={!validateInput(newItem.subcategory, 'subcategory')}
                  >
                    <PlusCircle size={18} /> Add
                  </button>
                </div>

                {/* Subcategories List */}
                {category.subcategories && category.subcategories.length > 0 ? (
                  <div className="space-y-2">
                    {category.subcategories.map((sub) => (
                      <div
                        key={sub.subcategory_id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#3a4057] rounded"
                      >
                        <div className="flex items-center gap-3">
                          {sub.image_url && (
                            <img
                              src={sub.image_url}
                              alt={sub.subcategory_name}
                              className="w-8 h-8 rounded object-cover"
                            />
                          )}
                          {editing.subcategory?.subcategory_id === sub.subcategory_id ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                className="p-1 border rounded dark:bg-[#1f253b]"
                                value={editing.subcategory.subcategory_name}
                                onChange={(e) =>
                                  setEditing(prev => ({
                                    ...prev,
                                    subcategory: { ...prev.subcategory, subcategory_name: e.target.value },
                                  }))
                                }
                              />
                              <input
                                type="text"
                                className="p-1 border rounded dark:bg-[#1f253b]"
                                value={editing.subcategory.image_url}
                                onChange={(e) =>
                                  setEditing(prev => ({
                                    ...prev,
                                    subcategory: { ...prev.subcategory, image_url: e.target.value },
                                  }))
                                }
                              />
                            </div>
                          ) : (
                            <span>{sub.subcategory_name}</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {editing.subcategory?.subcategory_id === sub.subcategory_id ? (
                            <>
                              <button
                                className="p-1 text-green-500 hover:bg-green-100 dark:hover:bg-green-900 rounded"
                                onClick={() =>
                                  handleEdit("subcategory", sub.subcategory_id, {
                                    subcategory_name: editing.subcategory.subcategory_name,
                                    image_url: editing.subcategory.image_url,
                                  })
                                }
                              >
                                <Check size={18} />
                              </button>
                              <button
                                className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                                onClick={() => toggleEdit("subcategory", null)}
                              >
                                <X size={18} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
                                onClick={() => toggleEdit("subcategory", sub)}
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                                onClick={() => handleDelete("subcategory", sub.subcategory_id)}
                              >
                                <Trash size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No subcategories available
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatandsubcatPage;