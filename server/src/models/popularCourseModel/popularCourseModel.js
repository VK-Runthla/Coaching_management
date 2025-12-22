const mongoose = require('mongoose');


const popularCourseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    },
    description: {
      type: String,
      required: true,
    },  
    courseImage: {
      type: String,
        required: true,
    },
});
module.exports = mongoose.model('PopularCourse', popularCourseSchema);