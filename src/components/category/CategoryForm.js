import React, { useState, useEffect } from 'react';
import categoryService from '../service/categoryService'; 

const CategoryForm = ({ selectedCategory, onSave, onCancel }) => {
  const [category, setCategory] = useState({
    categoryName: '',
    createdBy: 0,
    createdon: new Date(),
    isActive: true,
  });

  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category.categoryId) {
        await categoryService.updateCategory(category.categoryId, category);
      } else {
        await categoryService.addCategory(category);
      }
      onSave();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">

        
      <div className="col-md-6">
        <label htmlFor="categoryName" className="form-label">Category Name:</label>
        <input
          type="text"
          className="form-control"
          id="categoryName"
          name="categoryName"
          value={category.categoryName}
          onChange={handleChange}
          required
        />
      </div>
      
      
      
      {/* <div className="col-md-6">
        <label htmlFor="description" className="form-label">Description:</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={category.description}
          onChange={handleChange}
          required
        />
      </div> */}
      {/* <div className="col-12">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={category.isActive}
            onChange={(e) => setCategory({ ...category, isActive: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="isActive">Is Active</label>
        </div>
      </div> */}
      <div className="col-12">
        <button type="submit" className="btn btn-primary me-2">Save Category</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
