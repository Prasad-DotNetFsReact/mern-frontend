import React, { useState, useEffect } from 'react';
import authorService from '../service/authorService';

const AuthorForm = ({ selectedAuthor, onSave, onCancel }) => {
  const [author, setAuthor] = useState({
    authorName: '',
    country: '',
    authorInformation: '',
    createdBy: 1,
    isActive: true,
  });

  useEffect(() => {
    if (selectedAuthor) {
      setAuthor(selectedAuthor);
    }
  }, [selectedAuthor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prevAuthor) => ({ ...prevAuthor, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (author.authorId) {
        await authorService.updateAuthor(author.authorId, author);
      } else {
        await authorService.addAuthor(author);
      }
      onSave();
    } catch (error) {
      console.error('Error saving author:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label htmlFor="authorName" className="form-label">Author Name:</label>
        <input
          type="text"
          className="form-control"
          id="authorName"
          name="authorName"
          value={author.authorName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="country" className="form-label">Country:</label>
        <input
          type="text"
          className="form-control"
          id="country"
          name="country"
          value={author.country}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12">
        <label htmlFor="authorInformation" className="form-label">Author Information:</label>
        <textarea
          className="form-control"
          id="authorInformation"
          name="authorInformation"
          value={author.authorInformation}
          onChange={handleChange}
          rows="4"
        />
      </div>
      <div className="col-12">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={author.isActive}
            onChange={(e) => setAuthor({ ...author, isActive: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="isActive">Is Active</label>
        </div>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary me-2">Save Author</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AuthorForm;
