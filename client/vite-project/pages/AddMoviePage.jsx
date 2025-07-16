import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AddMoviePage() {
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
      rating:rating,
      genres:genres,
      description: desc,
    };

    try {
      const res = await fetch('http://localhost:8000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
      });

      if (res.ok) {
        navigate('/movies');
      } else {
        console.error("Failed to add movie");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
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

        <button type="submit">Add</button>
      </form>

      <Link to="/movies">Back</Link>
    </div>
  );
}

export default AddMoviePage;