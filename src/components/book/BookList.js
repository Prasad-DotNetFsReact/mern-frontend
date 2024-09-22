import React, { useState, useEffect } from 'react';
import bookService from '../service/bookService'; 
import BookForm from './BookForm';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await bookService.getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = () => {
    setSelectedBook(null);
    setShowForm(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setShowForm(true);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await bookService.deleteBook(bookId);
      loadBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleSave = () => {
    loadBooks();
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Book List</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddBook}>
        Add Book
      </button>

      {showForm && (
        <BookForm
          selectedBook={selectedBook}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table">
          <tr>
            <th>Title</th>
            <th>Author ID</th>
            <th>Publisher ID</th>
            <th>Category ID</th>
            <th>Publication Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.authorId}</td>
              <td>{book.publisherId}</td>
              <td>{book.categoryId}</td>
              <td>{book.publicationDate}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-success me-2"
                  onClick={() => handleEditBook(book)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteBook(book.bookId)}
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

export default BookList;
