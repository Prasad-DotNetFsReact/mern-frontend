import React, { useState, useEffect } from 'react';
import categoryService from '../service/categoryService'; 
import CategoryForm from './CategoryForm';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await categoryService.deleteCategory(categoryId);
      loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSave = () => {
    loadCategories();
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Category List</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddCategory}>
        Add Category
      </button>

      {showForm && (
        <CategoryForm
          selectedCategory={selectedCategory}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table">
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.categoryId}>
              <td>{category.categoryName}</td>
              <td>{category.description}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-success me-2"
                  onClick={() => handleEditCategory(category)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteCategory(category.categoryId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
