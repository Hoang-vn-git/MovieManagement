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
  const getCookie = (cookieName) => { // referrences stackoverflow 
        const cookie = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
        return cookie[cookieName];
    }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<PrivateRoute Component={MovieListPage} getCookie={getCookie}/>} />
        <Route path="/movies/add" element={<PrivateRoute Component={AddMoviePage} getCookie={getCookie}/>} />
        <Route path="/movies/:id/edit" element={<PrivateRoute Component={EditMoviePage} getCookie={getCookie}/>} />
        <Route path="/movies/:id" element={<PrivateRoute Component={MovieDetailPage} getCookie={getCookie}/>} />
      </Routes>
    </Router>
  );
}
