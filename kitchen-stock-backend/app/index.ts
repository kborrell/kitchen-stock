import express from "express";
import cors from "cors";
import morgan from "morgan";
import unknownEndpoint from "./middleware/unknowndEndpoint";
import errorHandler from "./middleware/errorHandler";
import productRoutes from "./routes/products"
import categoriesRoutes from "./routes/categories"
import stockRoutes from "./routes/stocks"

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use('/api/products', productRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/stocks', stockRoutes)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app