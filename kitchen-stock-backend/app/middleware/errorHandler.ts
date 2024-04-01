import {Error} from "mongoose";
import {NextFunction, Request, Response} from "express";

const errorHandler= (error : Error, _ : Request, response : Response, next : NextFunction) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

export default errorHandler