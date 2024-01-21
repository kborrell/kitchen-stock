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
    expireDate: {
        type: Date
    },
    isOpen: {
        type: Boolean,
        required: true
    },
    expires: {
        type: Boolean,
        required: true
    },
    remaining: {
        type: String,
    }
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

