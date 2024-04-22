import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import initApp from './src/index.router.js';
const app = express()
const port = process.env.PORT;

initApp(app,express)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))