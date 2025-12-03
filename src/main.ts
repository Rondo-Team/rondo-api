import express from "express"
import { config } from "./config/infrastructure/config.ts"

const port = config.app.port
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})