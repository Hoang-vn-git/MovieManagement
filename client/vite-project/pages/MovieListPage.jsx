import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import '../style/style.css';


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
            <h2 >Movies</h2>
            <div className="addmovie">
            <Link to="/movies/add" className="addmovie_button">Add New Movie</Link>
            </div>
            <ul>
                {movies.map((movie) => {
                    return (
                        <li key={movie._id} >
                            <Link to={`/movies/${movie._id}`} classname="listout">{`${movie.name}(${movie.year})`}</Link>
                        </li>


                    )
                })}
            </ul>
        </div>
    )
}


export default MovieListPage



