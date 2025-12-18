const mongoose = require("mongoose");
const PopularCourse = require("../../models/popularCourseModel/popularCourseModel");

const addPopularCourse = async (req, res) => {
  try {
    const { courseTitle, description } = req.body;
    if (!courseTitle) {
      return res
        .status(400)
        .json({ status: false, message: "Course Title is required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ status: false, message: "Description is required" });
    }
    const popularCourse = await PopularCourse({
      courseTitle,
      description,
      courseImage: req.file ? req.file.filename : null,
    });
    if (!popularCourse.courseImage) {
      return res
        .status(400)
        .json({ status: false, message: "Course Image is required" });
    }
    
    await popularCourse.save();
    res
      .status(201)
      .json({
        status: true,
        message: "Popular Course added successfully",
        data: popularCourse,
      });
  } catch (error) {
    console.log("Error adding popular course", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const getPopularCourses = async (req, res) => {
  try {
    const popularCourses = await PopularCourse.find();  
    res.status(200).json({
      status: true,
      data: popularCourses,
    });
  } catch (error) {
    console.log("Error fetching popular courses", error);
    res.status(500).json({  
        status: false,
        message: "Server error",
    });
    }
};

const updatePopularCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseTitle, description } = req.body;
    const updatedCourse = await PopularCourse.findByIdAndUpdate(
      id,
      { courseTitle, description },
        { new: true }
    );
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ status: false, message: "Popular Course not found" });
    }
    res.status(200).json({
      status: true,
        message: "Popular Course updated successfully",
        data: updatedCourse,
    });
    } catch (error) {
    console.log("Error updating popular course", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const deletePopularCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await PopularCourse.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res
        .status(404)
        .json({ status: false, message: "Popular Course not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "Popular Course deleted successfully" });
  } catch (error) {
    console.log("Error deleting popular course", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = { addPopularCourse, deletePopularCourse, getPopularCourses, updatePopularCourse};
