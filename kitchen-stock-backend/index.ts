import {connectDb} from "./app/db";
import app from "./app";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires
require('dotenv').config()
require('express-async-errors')

connectDb()

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})