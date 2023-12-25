import mongoose from "mongoose";

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

const productSchema = new mongoose.Schema({
    name: String,
})

productSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export interface IProduct extends mongoose.Document {
    name: string;
}

const Product = mongoose.model<IProduct>('Product', productSchema)
export default Product

