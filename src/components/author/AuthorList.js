import React, { useState, useEffect } from 'react';
import authorService from '../service/authorService';
import AuthorForm from './AuthorForm';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const response = await authorService.getAuthors();
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleAddAuthor = () => {
    setSelectedAuthor(null);
    setShowForm(true);
  };

  const handleEditAuthor = (author) => {
    setSelectedAuthor(author);
    setShowForm(true);
  };

  const handleDeleteAuthor = async (authorId) => {
    try {
      await authorService.deleteAuthor(authorId);
      loadAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const handleSave = () => {
    loadAuthors();
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Author List</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddAuthor}>
        Add Author
      </button>

      {showForm && (
        <AuthorForm
          selectedAuthor={selectedAuthor}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table">
          <tr>
            <th>Author Name</th>
            <th>Country</th>
            <th>Information</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.authorId}>
              <td>{author.authorName}</td>
              <td>{author.country}</td>
              <td>{author.authorInformation}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-success me-2"
                  onClick={() => handleEditAuthor(author)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteAuthor(author.authorId)}
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

export default AuthorList;
