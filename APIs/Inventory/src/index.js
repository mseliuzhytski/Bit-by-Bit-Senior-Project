import express from "express"
import { Inventory } from '@Routes'


const app = express()
const port = 3000


app.use(express.json()); // json format


// get request extra stuff not needed
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use("/inventory", Inventory)


app.listen(port, () => {
  console.log(`App listening on port ${port}..`)
})