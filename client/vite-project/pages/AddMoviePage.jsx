import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AddMoviePage({ getCookie }) {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [desc, setDesc] = useState('');
  const [rating, setRating] = useState('')
  const [genres, setGenres] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      name: name,
      year: year,
      rating: rating,
      genres: genres,
      description: desc,
    };

    // POST API
    try {
      const res = await fetch('http://localhost:8000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`
        },
        body: JSON.stringify(newMovie)
      });

      // RESPONE VERIFY --> MOVIES
      if (res.ok) {
        navigate('/movies');
      } else {
        alert('No permission');
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className='container'>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />


        <label htmlFor="year">Year:</label>
        <input type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)} required />


        <label htmlFor="rating">Rating:</label>
        <input type="text" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} required />


        <label htmlFor="genres">Genres(seperate by comma):</label>
        <input type="text" id="genres" value={genres} onChange={(e) => setGenres(e.target.value)} required />


        <label htmlFor="desc">Description:</label>
        <input type="text" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} required />

        <div className="add_back">
          <button type="submit">Add</button>
          <Link to="/movies" className="back_button">Back</Link>
        </div>
      </form>



    </div>
  );
}

export default AddMoviePage;