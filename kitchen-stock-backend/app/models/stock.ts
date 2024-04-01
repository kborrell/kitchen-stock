import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    format: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    expireDate: {
        type: Date
    },
    open: {
        type: [{
            remaining: String,
            date: Date
        }]
    },
})

stockSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Stock = mongoose.model('Stock', stockSchema)
export default Stock

