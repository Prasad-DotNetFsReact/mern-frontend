import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/links/Header';
import AuthorList from './components/author/AuthorList';
import AuthorForm from './components/author/AuthorForm';
import BookList from './components/book/BookList';
import BookForm from './components/book/BookForm';
import CategoryList from './components/category/CategoryList';
import CategoryForm from './components/category/CategoryForm';
import PublisherList from './components/publisher/PublisherList';
import PublisherForm from './components/publisher/PublisherForm';
import Login from './components/auth/Login';  
import ProtectedRoute from './components/auth/ProtectedRoute';  

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');  
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />  
      <Routes>
      
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        
        <Route 
          path="/" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <BookList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-book" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <BookForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-book/:id" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <BookForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/authors" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AuthorList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-author" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AuthorForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-author/:id" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AuthorForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/categories" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CategoryList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-category" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CategoryForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-category/:id" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CategoryForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/publishers" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PublisherList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-publisher" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PublisherForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-publisher/:id" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PublisherForm />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;











