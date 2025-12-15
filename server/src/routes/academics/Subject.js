const express = require('express')
const { addSubject, updateSubject } = require('../../controllers/academics/Subject')

const subjectRouter = express.Router()

subjectRouter.post('/addSubject' , addSubject) 
subjectRouter.patch('/updateSubject' , updateSubject) 

module.exports = subjectRouter