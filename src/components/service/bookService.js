import axios from 'axios';

const API_URL = 'http://localhost:4000/api/books';


const getBooks = () => axios.get(API_URL);
const getBookById = (id) => axios.get(`${API_URL}/${id}`);
const addBook = (book) => axios.post(API_URL, book);
const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);
const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};



