const { MovieModel } = require('../models/movie')
const { CustomerModel } = require('../models/customer')
const { validateRental, RentalModel } = require('../models/rental')
const express = require('express')
const router = express.Router()

// Get all rentals
router.get('/', async (req, res) => {
  const rentals = await RentalModel.find().sort('name')
  return res.send(rentals)
})

// Get rental by id
router.get('/:id', async (req, res) => {
  const rental = await RentalModel.findById(req.params.id)
  if (!rental) return res.status(404).send('The rental was not found')

  return res.send(rental)
})

// Create a new rental
router.post('/', async (req, res) => {
  const { error } = validateRental(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const customer = await CustomerModel().findById(req.body.customerId)
  if (!customer) return res.status(404).send('Invalid customer')

  const movie = await MovieModel().findById(req.body.movieId)
  if (!movie) return res.status(404).send('Invalid movie')
  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.')

  let rental = new RentalModel({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  })
  rental = await rental.save()

  movie.numberInStock--
  movie.save()

  res.send(rental)
})
