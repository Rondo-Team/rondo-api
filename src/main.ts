import express from "express"
const port = process.env.PORT ?? 3000

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})