const express = require('express')
const { addSubject, updateSubject, deleteSubject, getSubject } = require('../../controllers/academics/Subject')

const subjectRouter = express.Router()

subjectRouter.post('/addSubject', addSubject)
subjectRouter.get('/getSubject', getSubject)
subjectRouter.patch('/updateSubject/:id', updateSubject)
subjectRouter.delete('/deleteSubject/:id', deleteSubject)
module.exports = subjectRouter