const { model, Schema } = require('mongoose')
const Joi = require('joi')

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50
  }
})

const GenreModel = model('genres', genreSchema)

// Validate function
const validateGenre = genre => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required()
  })

  return schema.validate(genre)
}

module.exports = { GenreModel, validateGenre }
