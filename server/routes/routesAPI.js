const express = require('express')

const routerAPI = express.Router()

const Movie = require("../models/movie")

const User = require("../models/user")

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs')

const passport = require('passport')


const { check, validationResult } = require('express-validator')




// check token

const checkToken = async (req, res, next) => {
    try {
        const header = req.headers['authorization']

        if (!header) return res.status(403).send("ERROR")

        const bearer = header.split(' ')

        const token = bearer[1]

        const payload = jwt.verify(token, 'privatekey')

        const user = await User.findById({ _id: payload.userID })

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        console.error("checkToken error:", err.message);
        res.status(401).json({ message: "Invalid token" });

    }
}

// check role
const checkRole = async (req, res, next) => {
    const token = req.token;

    try {
        const payload = jwt.verify(token, 'privatekey');
        const user = await User.findById(payload.userID);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role === 0) {
            next();
        } else {
            res.status(403).json({ message: "No Permission" });
        }
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Validate 
const validator = async (req, res, next) => {
    await check("email", "Email is required").notEmpty().run(req);
    await check("email", "Email is invalid").isEmail().run(req);
    await check("password", "Password is required").notEmpty().run(req);

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        next()
    } else {
        res.status(400).json({
            message: errors.array()
        })
    }
}
// create token
routerAPI.route('/api')
    .post(validator, (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) return next(err);

            if (!user) {
                return res.status(401).json({ message: "Authentication failed" });
            }

            // VERIFY SUCCESSFUL --> CREATE TOKEN
            const token = jwt.sign({ userID: user._id }, 'privatekey', { expiresIn: '1h' });

           
            res.cookie('token', token, {
                httpOnly: false,
                sameSite: 'lax',
                secure: false,  
            }).status(200).json({ message: 'Login successful', token });
        })(req, res, next); // <
    })

routerAPI.route('/api/logout')
    .get((req, res) => {
        res.clearCookie('token', {
            httpOnly: false,     // PHẢI giống lúc set
            sameSite: 'lax',
            secure: false
        });
        res.status(200).json({ message: "Logged out" });
    });
// Register 
routerAPI.route('/api/register')
    .post(validator, async (req, res) => {
        try {
            const { email, password, role } = req.body;

            // Kiểm tra email trùng
            const existed = await User.findOne({ email });
            if (existed) {
                return res.status(400).json({
                    errors: [{ msg: 'Email already exists' }]
                });
            }

            // Hash mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Tạo user
            const newUser = await User.create({
                email: email,
                password: hashedPassword,
                role: role
            });

            // Trả về thành công (ẩn password)
            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser._id,
                    email: newUser.email,
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
        }
    });

// List movie
routerAPI.route('/api/movies')
    .get(checkToken, async (req, res) => {
        try {
            const movies = await Movie.find({});
            res.status(200).json(movies)
        } catch (err) {
            console.log("Error fetching movies: ", err)
            res.status(500).send("Internal Server Error")
        }
    })
    // Add movie
    .post(checkToken, checkRole, async (req, res) => {

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
    })
// Movie detail
routerAPI.route('/api/movies/:id')
    .get((async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id)

            if (!movie) res.status(404).send("Movie not found")

            res.status(200).json(movie)
        } catch (err) {
            console.log("Movie not found: ", err)
            res.status(500).send("Internal Server Error")
        }
    })
    )

    // Update movie
    .put(checkToken, checkRole, async (req, res) => {
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
    // Delete movie
    .delete(checkToken, checkRole, async (req, res) => {
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json()
        } catch (err) {
            console.log("Cannot delete movie: ", err)
            res.status(500).send("Internal Server error")
        }
    })


module.exports = routerAPI