// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MovieListPage from '../pages/MovieListPage';
import AddMoviePage from '../pages/AddMoviePage';
import EditMoviePage from '../pages/EditMoviePage';
import MovieDetailPage from '../pages/MovieDetailPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/movies" element={<MovieListPage />} />
        <Route path="/movies/add" element={<AddMoviePage />} />
        <Route path="/movies/:id/edit" element={<EditMoviePage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
}
