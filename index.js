const Joi = require('joi')
const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/api/genres', (req, res) => {
  res.send('Hello World!')
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
