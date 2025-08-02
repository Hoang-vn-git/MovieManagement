// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MovieListPage from '../pages/MovieListPage';
import AddMoviePage from '../pages/AddMoviePage';
import EditMoviePage from '../pages/EditMoviePage';
import MovieDetailPage from '../pages/MovieDetailPage';
import PrivateRoute from '../pages/PrivateRoute';
import "../style/style.css"
import Register from '../pages/Register';


export default function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<PrivateRoute Component={MovieListPage} />} />
        <Route path="/movies/add" element={<PrivateRoute Component={AddMoviePage} />} />
        <Route path="/movies/:id/edit" element={<PrivateRoute Component={EditMoviePage} />} />
        <Route path="/movies/:id" element={<PrivateRoute Component={MovieDetailPage} />} />
      </Routes>
    </Router>
  );
}
