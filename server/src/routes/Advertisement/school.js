const express = require('express')
const upload = require('../../middlewares/Advertisement/school')
const { addSchoolImg, getSchoolImg, UpdateSchoolData, DeleteSchoolData } = require('../../controllers/Advertisement/school')

const Schoolrouter = express.Router()

Schoolrouter.post('/school_img', upload.single('file'), addSchoolImg)
Schoolrouter.get('/school_img', getSchoolImg)
Schoolrouter.put('/update/:id', upload.single('file'), UpdateSchoolData)
Schoolrouter.delete('/DeleteSchoolData/:id', DeleteSchoolData )


module.exports = Schoolrouter
