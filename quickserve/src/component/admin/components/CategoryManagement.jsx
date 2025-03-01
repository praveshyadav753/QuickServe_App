import React from 'react';

function CategoryManagement({ categories }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Category Management</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id} className="mb-4">
            <p className="font-medium">{category.name}</p>
            <ul className="ml-4">
              {category.subcategories.map((subcategory, index) => (
                <li key={index} className="text-sm text-gray-500">{subcategory}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManagement;