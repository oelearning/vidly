const { GenreModel } = require('../models/genre')
const { validateGenre } = require('../models/genre')
const express = require('express')
const router = express.Router()

// Get all genres
router.get('/', async (req, res) => {
  const genres = await GenreModel.find().sort('name')
  return res.send(genres)
})

// Get genre by id
router.get('/:id', async (req, res) => {
  const genre = await GenreModel.findById(req.params.id)
  if (!genre) return res.status(404).send('The genre was not found')

  return res.send(genre)
})

// Create new genre
router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let genre = new GenreModel({ name: req.body.name })
  genre = await genre.save()
  return res.send(genre)
})

// Update a genre by id
router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await GenreModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  )

  if (!genre) return res.status(404).send('The genre was not found')
  return res.send(genre)
})

// Delete a genre
router.delete('/:id', async (req, res) => {
  const genre = await GenreModel.findByIdAndRemove(req.params.id)
  if (!genre) return res.status(404).send('The genre was not found')

  return res.send(`The genre with the ID: ${genre.id} was deleted successfully`)
})

module.exports = router
