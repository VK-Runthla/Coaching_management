const express = require('express')
const adminRouter = require("../server/src/routes/addadminRoute")
const connectedDatabase = require("./src/config/db")
const batchesRoute = require('./src/routes/batchesRoute')
const routerCourse = require('./src/routes/academics/courseRouter')
const app = express()
const port = 4001
app.use(express.json())

connectedDatabase()
app.use('/api/admin',adminRouter)
app.use('/api/admin',batchesRoute)
app.use('/api/admin',routerCourse)

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`App is running on port : http://localhost:${port}`)
);
