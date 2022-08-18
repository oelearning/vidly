const morgan = require('morgan')
const helmet = require('helmet')
const genres = require('./routes/genres')
const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 5000

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
