// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           Book Management System
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Books
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/authors">
//                 Authors
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/categories">
//                 Categories
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/publishers">
//                 Publishers
//               </Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link className="nav-link" to="/add-book">
//                 Add Book
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/add-author">
//                 Add Author
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/add-category">
//                 Add Category
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/add-publisher">
//                 Add Publisher
//               </Link>
//             </li> */}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;
// src/components/links/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();  // Call the logout function passed from App.js
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        MyApp
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/books">
                  Books
                </Link>
              </li>
              {/* Add other links as needed */}
            </>
          )}
        </ul>
        {isAuthenticated ? (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
