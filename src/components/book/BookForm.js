import React, { useState, useEffect } from 'react';
import bookService from '../service/bookService'; 

const BookForm = ({ selectedBook, onSave, onCancel }) => {
  const [book, setBook] = useState({
    bookName: '',
    edition: 0,
    authorId: 0,
    publisherId: 0,
    categoryId: 0,
    description: '',
    pageCount: 0,
    publicationDate: '',
    createdon: new Date(),
    createdBy: 0,
    isActive: true,
  });

  useEffect(() => {
    if (selectedBook) {
      setBook(selectedBook);
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (book.bookId) {
        await bookService.updateBook(book.bookId, book);
      } else {
        await bookService.addBook(book);
      }
      onSave();
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label htmlFor="bookName" className="form-label">bookName:</label>
        <input
          type="text"
          className="form-control"
          id="bookName"
          name="bookName"
          value={book.bookName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="authorId" className="form-label">Author ID:</label>
        <input
          type="number"
          className="form-control"
          id="authorId"
          name="authorId"
          value={book.authorId}
          onChange={handleChange}
          required
        />
        
      </div>
      <div className="col-md-6">
        <label htmlFor="edition" className="form-label">edition:</label>
        <input
          type="number"
          className="form-control"
          id="edition"
          name="edition"
          value={book.edition}
          onChange={handleChange}
          required
        />
        
      </div>
      
      <div className="col-md-6">
        <label htmlFor="description" className="form-label">description:</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={book.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="pageCount" className="form-label">pageCount:</label>
        <input
          type="number"
          className="form-control"
          id="pageCount"
          name="pageCount"
          value={book.pageCount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="publisherId" className="form-label">Publisher ID:</label>
        <input
          type="number"
          className="form-control"
          id="publisherId"
          name="publisherId"
          value={book.publisherId}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="categoryId" className="form-label">Category ID:</label>
        <input
          type="number"
          className="form-control"
          id="categoryId"
          name="categoryId"
          value={book.categoryId}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="publicationDate" className="form-label">Publication Date:</label>
        <input
          type="date"
          className="form-control"
          id="publicationDate"
          name="publicationDate"
          value={book.publicationDate}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div className="col-12">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={book.isActive}
            onChange={(e) => setBook({ ...book, isActive: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="isActive">Is Active</label>
        </div>
      </div> */}
      <div className="col-12">
        <button type="submit" className="btn btn-primary me-2">Save Book</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookForm;
