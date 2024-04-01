import {Request, Response} from "express";

const unknownEndpoint = (_ : Request, response : Response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

export default unknownEndpoint