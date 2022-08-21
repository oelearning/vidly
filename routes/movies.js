const { MovieModel, validateMovie } = require('../models/movie')
const { GenreModel } = require('../models/genre')
const express = require('express')
const router = express.Router()

// Get all movies
router.get('/', async (req, res) => {
  const movies = await MovieModel().find().sort('name')
  return res.send(movies)
})

// Get movie by id
router.get('/', async (req, res) => {
  const movie = await MovieModel().findById(req.params.id)
  if (!movie) return res.status(404).send('The movie was not found')

  return res.send(movie)
})

// Create a movie
router.get('/', async (req, res) => {
  const { error } = validateMovie(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await GenreModel().findById(req.params.genreId)
  if (!genre) return res.status(400).send('Invalid genre')

  let movie = new MovieModel({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  })
  movie = await movie.save()

  res.send(movie)
})

// Update a movie by id
router.get('/', async (req, res) => {
  const { error } = validateMovie(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await GenreModel().findById(req.params.genreId)
  if (!genre) return res.status(400).send('Invalid genre')

  const movie = await MovieModel.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true })

  if (!movie) return res.status(404).send('The movie with the given ID was not found.')

  return res.send(movie)
})

// Delete a movie by id
router.get('/', async (req, res) => {
  const movie = await MovieModel().findByIdAndRemove(req.params.id)
  if (!movie) return res.status(404).send('The movie was not found')

  return res.send(movie)
})

module.exports = router
