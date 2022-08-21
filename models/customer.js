const { model, Schema } = require('mongoose')
const Joi = require('joi')

const customerSchema = new Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: String,
    minlength: 10,
    required: true
  }
})

const CustomerModel = model('customers', customerSchema)

// Validate Fuction
const validateCustomer = customer => {
  const schema = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(10).required()
  })

  return schema.validate(customer)
}

module.exports = { CustomerModel, validateCustomer }
