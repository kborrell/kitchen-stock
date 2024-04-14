import mongoose, {Model} from "mongoose";

export const getEntityById = (id: string, model: Model<any>) => {
    if (validateObjectId(id)) {
        const stock = model.findById(id)

        if (!stock) {
            throw new Error('entity not found')
        }

        return stock
    }
}

export const validateObjectId = (id: string) => {
    if (mongoose.Types.ObjectId.isValid(id))
    {
        return true
    }

    throw new Error('invalid entity id')
}