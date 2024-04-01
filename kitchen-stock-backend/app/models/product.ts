import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    trackOpen: {
        type: Boolean,
        required: true
    },
    expires: {
        type: Boolean,
        required: true
    },
    daysToKeep: {
        type: Number
    },
    stocks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Stock',
        required: true
    }
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

