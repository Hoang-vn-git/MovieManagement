import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function MovieDetailPage({getCookie}) {
    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://mighty-mesa-62871-571878c34ddf.herokuapp.com/api/movies/${id}`)
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((err) => console.error("Failed to fetch movie:", err));
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`https://mighty-mesa-62871-571878c34ddf.herokuapp.com/api/movies/${id}`, {
                method: 'DELETE',
 credentials:"include"
            });
            const message = await res.json()
            if (res.ok) {
                alert(message.message)
                navigate('/movies');
            } else {
                alert(message.message)
            }
        } catch (err) {
            console.error('Error deleting movie:', err);
        }
    };

    if (!movie.name) return <h1>Movie not found</h1>

     return (
        <div className='container'>
            <video autoPlay loop muted playsInline>
                <source src="../images/background-video.mp4" type="video/mp4" />
            </video>
            <h2 className='movieName'>{movie.name}</h2>
            <div className='textStyles'>
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
                <p><strong>Posted by:</strong> {movie.user}</p>
            </div>
                
          
            <div className="edit_movie">
                <Link to="/movies" className="backlist_button">Back to list</Link>
                <Link to={`/movies/${id}/edit`} className="edit_button">Edit</Link>
                <button onClick={handleDelete}>Delete</button>
            </div>
            


        </div>
    )
}

export default MovieDetailPage
