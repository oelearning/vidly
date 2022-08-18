const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require('joi')
const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 5000

// Tempo Data
const genres = [
  { title: 'ToyStory 3', genre: 'Kids', id: 1 },
  { title: 'John Wick 2', genre: 'Action', id: 2 },
  { title: 'What happened yesterday?', genre: 'Comedy', id: 3 }
]

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())

if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
  console.log('Morgan enabled...')
}

// Get all genres
app.get('/api/genres', (req, res) => {
  res.send(genres)
})

// Get genre by id
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(item => item.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre was not found')

  return res.send(genre)
})

// Create new genre
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = {
    id: genres.length + 1,
    title: req.body.title,
    genre: req.body.genre
  }

  genres.push(genre)
  return res.send({
    message: 'The movie was created successfully',
    genre
  })
})

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(item => item.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre was not found')

  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  genre.title = req.body.title
  genre.genre = req.body.genre

  return res.send({
    message: 'The genre was updated successfully',
    genre
  })
})

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(item => item.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre was not found')

  const index = genres.indexOf(genre)
  genres.splice(index, 1)

  return res.send({
    message: 'The genre was deleted successfully',
    genre
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

function validateGenre (genre) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genre: Joi.string().min(3).required()
  })

  return schema.validate(genre)
}
