import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'

function MovieDetailPage() {
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
            });
            console.log(res.status)
            if (res.ok) {
                navigate('/movies');
            } else {
                console.error('Delete failed');
            }
        } catch (err) {
            console.error('Error deleting movie:', err);
        }
    };
    
    if (!movie.name) return <h1>Movie not found</h1>

    return (
        <div>
            <h2>{movie.name}</h2>
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
            <div>
                <Link to="/movies">Back to list</Link>
            </div>
            <div>

                <Link to={`/movies/${id}/edit`}>Edit</Link>
            </div>
            <button onClick={handleDelete}>Delete</button>

        </div>
    )
}

export default MovieDetailPage
