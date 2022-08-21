const { CustomerModel, validateCustomer } = require('../models/customer')
const express = require('express')
const router = express.Router()

// Get all customers
router.get('/', async (req, res) => {
  const customers = await CustomerModel.find().sort('name')
  res.send(customers)
})

// Get customer by id
router.get('/:id', async (req, res) => {
  const customer = await CustomerModel.findById(req.params.id)
  if (!customer) return res.status(404).send('Customer not found')
  res.send(customer)
})

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let customer = new CustomerModel({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  })

  customer = await customer.save()
  return res.send(customer)
})

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const customer = await CustomerModel().findByIdAndUpdate(
    req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone
    },
    { new: true }
  )
  if (!customer) return res.status(404).send('The genre was not found')
  return res.send(customer)
})

router.delete('/:id', async (req, res) => {
  const customer = await CustomerModel().findByIdAndRemove(req.params.id)
  if (!customer) return res.status(404).send('The customer was not found')

  return res.send(`The customer with the ID: ${customer.id} was deleted successfully`)
})

module.exports = router
