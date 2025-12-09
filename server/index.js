const express = require('express')
const app = express()
const port = 4001

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App is running on port : http://localhost:${port}`))