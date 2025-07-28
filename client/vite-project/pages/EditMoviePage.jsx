import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditMoviePage({ getCookie }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [genres, setGenres] = useState('')
  const [desc, setDesc] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setYear(data.year);
        setRating(data.rating);
        setGenres(data.genres.join(","));
        setDesc(data.description);
      })
      .catch((err) => console.error('Fetch movie failed:', err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedMovie = {
      name: name,
      year: year,
      rating: rating,
      genres: genres.split(','),
      description: desc,
    };

    try {
      const res = await fetch(`http://localhost:8000/api/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`
        },
        body: JSON.stringify(updatedMovie),
      });

      if (res.ok) {
        navigate(`/movies/${id}`);
      } else {
        alert('No permission');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className='container'>
      <h2>Edit Movie</h2>
      <form onSubmit={handleUpdate}>
        <label htmlFor="name">Name:</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />


        <label htmlFor="year">Year:</label>
        <input id="year" value={year} onChange={(e) => setYear(e.target.value)} required />


        <label htmlFor="rating">Rating:</label>
        <input id="rating" value={rating} onChange={(e) => setRating(e.target.value)} required />


        <label htmlFor="genres">Genres(seperate by comma)</label>
        <input id="genres" value={genres} onChange={(e) => setGenres(e.target.value)} required />


        <label htmlFor="desc">Description:</label>
        <input id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} required />


        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditMoviePage;