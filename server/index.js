const express = require('express')
const connectedDatabase = require("../server/src/config/db")
const adminRouter = require("../server/src/routes/addadminRoute")

const subjectRouter = require('./src/routes/SubjectRoutes')
const app = express()
const port = 4001
connectedDatabase()

app.use(express.json())
app.use('/api/admin',adminRouter)
app.use('/api/student',subjectRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App is running on port : http://localhost:${port}`)) 