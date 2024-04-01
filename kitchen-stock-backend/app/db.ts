import mongoose from "mongoose";

export const connectDb = () => {
    mongoose.set('strictQuery', false)

    const url = process.env.MONGODB_URI ?? ""

    console.log('connecting to', url)

    mongoose.connect(url)
        .then(_ => {
            console.log('connected to MongoDB')
        })
        .catch(error => {
            console.log('error connecting to MongoDB:', error.message)
        })
}

