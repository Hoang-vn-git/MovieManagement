const express = require('express')

const routerAPI = express.Router()

const Movie = require("../models/movie")

let movies = []
let nextId = 0;


routerAPI.route('/api/movies')
    .get(async (req, res) => {
        try {
            const movies = await Movie.find({});
            res.status(200).json(movies)
        } catch (err) {
            console.log("Error fetching movies: ", err)
            res.status(500).send("Internal Server Error")
        }
    })

    .post(async (req, res) => {
        let { name, year, rating, genres, description } = req.body
        genres = genres.split(",")
        try {
            const newMovie = await Movie.create({
                name: name,
                year: parseInt(year),
                rating: parseInt(rating),
                genres: genres,
                description: description
            })
            res.status(200).json(newMovie)
        } catch (err) {
            console.log("Error adding movies: ", err)
            res.status(500).send("Internal Server error")
        }
        res.redirect("/movies")
    })

routerAPI.route('/api/movies/:id')
    .get(async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id)

            if (!movie) res.status(404).send("Movie not found")

            res.status(200).json(movie)
        } catch (err) {
            console.log("Movie not found: ", err)
            res.status(500).send("Internal Server Error")
        }
    })

    .put(async (req, res) => {
        let { name, year, rating, genres, description } = req.body

        try {
            const updateMovie = await Movie.findByIdAndUpdate(req.params.id, {
                name: name,
                year: parseInt(year),
                rating: parseInt(rating),
                genres: genres,
                description: description
            })
            res.status(200).json(updateMovie)
        } catch (err) {
            console.error("Error updating moive:", err);
            res.status(500).send("Internal Server Error");
        }
    })
    .delete(async (req, res) => {
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json()
        } catch (err) {
            console.log("Cannot delete movie: ", err)
            res.status(500).send("Internal Server error")
        }
    })

module.exports = routerAPI