const express = require('express')
require('dotenv').config()
const Person = require('./models/person')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))

// Usa el middleware de Morgan con el formato personalizado
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('dist'))

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(result => {
    response.json(result)
  }).catch(error => next(error))

})

app.get('/info', (request, response) => {
  const today = new Date()
  const count = Person.countDocuments()
  const info = `<p>Phonebook has info for ${count} people</p><p>${today.toString()}</p>`
  response.send(info)
})


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }

  }).catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    }).catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body === undefined || body === '') {
    return response.status(400).json({
      error: 'name and number missing'
    })
  }
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(result => {
    response.json(result)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    const errorMessages = Object.values(error.errors).map(err => err.message)
    return response.status(400).json({ error: errorMessages.join(', ') })
  }
  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})