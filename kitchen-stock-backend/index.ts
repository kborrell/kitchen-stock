import App from "./src/app";
import {connectDb} from "./src/db";

require('dotenv').config()

connectDb()

const app = new App()
app.setup()