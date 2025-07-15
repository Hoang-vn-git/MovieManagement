const express = require('express')

const router = express.Router()

let movies = []
let nextId = 0;


// / method GET

router.route('/')
    .get((req, res) => {
        res.render('list', {
            movies: movies
        })
    })

// /add methods GET, POST

router.route('/add')
    .get((req, res) => {
        res.render('add', { error: null })
    })
    .post((req, res) => {
        const { name, year, description } = req.body

        if (!name) res.render('app', { error: "Name is mandatory" })

        movies.push({
            id: nextId++,
            name: name,
            year: year,
            description: description
        });

        res.redirect('/')
    })

router.route('/:id')
    .get((req, res) => {
        const movie = movies.find((movie) => {
            return movie.id === parseInt(req.params.id)
        })
        if (!movie) res.status(404).send('Movie not found')

        res.render('detail', { movie: movie })
    })

router.route('/:id/edit')
    .get((req, res) => {
        const movie = movies.find((movie) => {
            return movie.id === parseInt(req.params.id)
        })

        if (!movie) res.status(404).send('Movie not found')

        res.render('edit', { movie: movie })
    })

    .post((req, res) => {
        const { name, year, description } = req.body;

        const movie = movies.find(m => m.id === parseInt(req.params.id));

        movie.name = name;
        movie.year = year;
        movie.description = description;

        if (!name) res.render('edit', { movie: movie, error: 'Movie name is mandatory' });

        res.redirect('/' + movie.id);
    })


router.route('/:id/delete')

    .post((req, res) => {
        movies = movies.filter((movie) => {
            return movie.id !== parseInt(req.params.id)
        })
        res.redirect('/');
    })




module.exports = router