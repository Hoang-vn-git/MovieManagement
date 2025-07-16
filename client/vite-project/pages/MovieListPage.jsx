import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

function MovieListPage() {
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        fetch("http://localhost:8000/api/movies")
            .then((res) => res.json())
            .then((movie) => setMovies(...movies, movie))
            .catch((err) => console.error("Failed to fetch movie:", err));
    }, [])

    return (
        <div>
            <h2>Movies</h2>
            <Link to="/movies/add">Add New Movie</Link>
            <ul>
                {movies.map((movie) => {
                    return (
                        <li key={movie._id}>
                            <Link to={`/movies/${movie._id}`}>{`${movie.name}(${movie.year})`}</Link>
                        </li>

                    )
                })}
            </ul>
        </div>
    )
}

export default MovieListPage
