import mongoose from "mongoose";

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

const Product = mongoose.model('Product', productSchema)
export default Product

