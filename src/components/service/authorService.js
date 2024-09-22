import axios from 'axios';

const API_URL = 'http://localhost:4000/api/authors';

const authorService = {
  getAuthors: () => axios.get(API_URL),
  getAuthorById: (id) => axios.get(`${API_URL}/${id}`),
  addAuthor: (author) => axios.post(API_URL, author),
  updateAuthor: (id, author) => axios.put(`${API_URL}/${id}`, author),
  deleteAuthor: (id) => axios.delete(`${API_URL}/${id}`),
};

export default authorService;






