const express = require('express')
const connectedDatabase = require("../server/src/config/db")
const adminRouter = require("../server/src/routes/addadminRoute")
const sessionrout = require('./src/routes/sessionRout')
const app = express()
const port = 4001
connectedDatabase()

app.use(express.json())
app.use('/api/admin',adminRouter)
app.use("/api/session",sessionrout)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App is running on port : http://localhost:${port}`))