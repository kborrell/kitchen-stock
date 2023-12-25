
require('dotenv').config()

import Product from "./models/product";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (_, response) => {
  response.send('Kitchen Stock App API')
})

app.get('/api/products', (_, response) => {
  Product.find({}).then(products => response.json(products))
})

app.get('/api/products/:id', (request, response, next) => {
  Product.findById(request.params.id)
      .then(product => {
        if (product) {
          response.json(product)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
})

app.post('/api/products', (request, response) => {
  const body = request.body
  console.log(body)

  if (!body.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const product = new Product({
    name: body.name
  })

  console.log(product)
  product.save().then(savedProduct => {
    response.json(savedProduct)
  })
})

// @ts-ignore
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// @ts-ignore
const errorHandler= (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id'})
  }

  next(error)
}

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})