import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function MovieDetailPage({getCookie}) {
    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/api/movies/${id}`)
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((err) => console.error("Failed to fetch movie:", err));
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:8000/api/movies/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`
                },
            });
            if (res.ok) {
                navigate('/movies');
            } else {
                alert('No permission');
            }
        } catch (err) {
            console.error('Error deleting movie:', err);
        }
    };

    if (!movie.name) return <h1>Movie not found</h1>

     return (
        <div className='container'>
            <h2 className='movieName'>{movie.name}</h2>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>  
            <p><strong>Genres: </strong></p>
            <ul>
                {movie.genres.map((genres, index) => {
                    return (
                        <li key={index}>{genres}</li>
                    )
                })}
            </ul>
            <p><strong>Description:</strong> {movie.description}</p>
          
                
          
            <div className="edit_movie">

            <Link to="/movies" className="backlist_button">Back to list</Link>
            <Link to={`/movies/${id}/edit`} className="edit_button">Edit</Link>
            <button onClick={handleDelete}>Delete</button>
            </div>
            


        </div>
    )
}

export default MovieDetailPage
