import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import video from '../public/background-video.mp4'

function EditMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [genres, setGenres] = useState('')
  const [desc, setDesc] = useState('');

  useEffect(() => {
    fetch(`https://mighty-mesa-62871-571878c34ddf.herokuapp.com/api/movies/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
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
      const res = await fetch(`https://mighty-mesa-62871-571878c34ddf.herokuapp.com/api/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedMovie),
      });
      const message = await res.json()
      if (res.ok) {
        alert(message.message)
        navigate(`/movies/${id}`);
      } else {
        alert(message.message)
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className='container'>
      <video autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
      </video>
      <h2>Edit Movie</h2>
      <form onSubmit={handleUpdate}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />


        <label htmlFor="year">Year:</label>
        <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value)} required />


        <label htmlFor="rating">Rating:</label>
        <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} required />


        <label htmlFor="genres">Genres(seperate by comma)</label>
        <input type="text" id="genres" value={genres} onChange={(e) => setGenres(e.target.value)} required />


        <label htmlFor="desc">Description:</label>
        <input type="text" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} required />


        <div className="add_back">
          <button type="submit">Update</button>
          <Link to={`/movies/${id}`} className="back_button">Back</Link>
        </div>
      </form>
    </div>
  );
}

export default EditMoviePage;