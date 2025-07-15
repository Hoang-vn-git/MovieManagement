const express = require('express')

const routerAPI = express.Router()

let movies = []
let nextId = 0;


routerAPI.route('/api/movies')
    .get((req, res) => {
        res.status(200).json(movies)
    })

    .post((req, res) => {
        const { name, year, description } = req.body


        const newMovies = {
            id: nextId++,
            name: name,
            year: year,
            description: description
        }
        movies.push(newMovies);

        res.status(201).json(newMovies)

    })

routerAPI.route('/api/movies/:id')
    .get((req, res) => {
        const movie = movies.find((movie) => {
            return movie.id === parseInt(req.params.id)
        })

        if (!movie) res.status(404).json({ error: "Movie not found" })

        res.status(200).json(movie)
    })

    .put((req, res) => {
        const { name, year, description } = req.body



        const movie = movies.find((movie) => {
            return movie.id === parseInt(req.params.id)
        })

        if (!movie) res.status(404).json({ error: "Movie not found" })

        movie.name = name;
        movie.year = year;
        movie.description = description;

        if (!name) res.render('app', { error: "Name is mandatory" })

        res.status(200).json(movie)

    })
    .delete((req, res) => {
        movies = movies.filter((movie) => movie.id !== parseInt(req.params.id));
        res.status(200).json({ message: 'Movie deleted' });
    })

module.exports = routerAPI