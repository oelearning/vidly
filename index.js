const morgan = require('morgan')
const helmet = require('helmet')
const genres = require('./routes/genres')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connected to MongoDB', err))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use('/api/genres', genres)

if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
  console.log('Morgan enabled...')
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
