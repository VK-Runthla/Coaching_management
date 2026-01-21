const express = require('express')
const { addSchoolImg } = require('../../controllers/Advertisement/school')
const upload = require('../../middlewares/Advertisement/school')

const Schoolrouter = express.Router()

Schoolrouter.post('/Schoolimg', upload.single('uploadImg'), addSchoolImg)

module.exports = Schoolrouter
