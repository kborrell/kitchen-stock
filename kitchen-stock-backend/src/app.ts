import express, {Express} from "express";
import cors from "cors";
import morgan from "morgan";
import {loadProductsService} from "./apis/productsService";
import {loadCategoriesService} from "./apis/categoriesService";

const App = class {

    expressApp : Express

    constructor() {
        this.expressApp = express()
    }

    setup() {
        this.expressApp.use(express.json())
        this.expressApp.use(cors())
        this.expressApp.use(morgan('tiny'))

        this. expressApp.get('/', (_, response) => {
            response.send('Kitchen Stock App API')
        })

        loadProductsService(this.expressApp)
        loadCategoriesService(this.expressApp)

// @ts-ignore
        const unknownEndpoint = (request, response) => {
            response.status(404).send({ error: 'unknown endpoint' })
        }

        this.expressApp.use(unknownEndpoint)

// @ts-ignore
        const errorHandler= (error, request, response, next) => {
            console.log(error)

            if (error.name === 'CastError') {
                return response.status(400).send({ error: 'malformed id'})
            } else if (error.name === 'ValidationError') {
                return response.status(400).json({error: error.message})
            }

            next(error)
        }

        this.expressApp.use(errorHandler)

        this.expressApp.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    }
}

export default App