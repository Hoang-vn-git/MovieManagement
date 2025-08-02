import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import video from '../public/background-video.mp4'

function MovieListPage({}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://mighty-mesa-62871-571878c34ddf.herokuapp.com/api/movies", {
      method:"GET",
      headers:{
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    )
      .then((res) => res.json())
      .then((movie) => setMovies(...movies, movie))
      .catch((err) => console.error("Failed to fetch movie:", err));
  }, [])

  return (
        <div className='container'>
            <video autoPlay loop muted playsInline>
                <source src={video} type="video/mp4" />
            </video>
            <h2>Movies</h2>
            <div className="addmovie">
            <Link to="/movies/add" className="addmovie_button">Add New Movie</Link>
            </div>
            <ul>
                {movies.map((movie) => {
                    return (
                        <li key={movie._id} >
                            <Link to={`/movies/${movie._id}`} className="listout">{`${movie.name}(${movie.year})`}</Link>
                        </li>


                    )
                })}
            </ul>
        </div>
    )
}

export default MovieListPage
