const moongose = require("mongoose");
const studentsschema = moongose.Schema({
    name: {
        type: String,
        required: true
    }
})
module.exports = studentsschema