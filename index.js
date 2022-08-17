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
