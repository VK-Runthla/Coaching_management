const express = require('express');
const supports = require('../../models/supportModel/supportSchema');


const addQuestion = async (req, res) => {
    try {
        const { student, question, message } = req.body;
        if (!student || !question || !message) {
            return res.status(400).json({ status: false, message: "all field are required" });
        }
        const data = await new supports({ student, question, message, image: req.file?.filename });
        await data.save();
        res.status(201).json({ status: true, message: "doubt added successfully", data });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", err: error.message });

    }
}


const getQuestion = async (req, res) => {

}

const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { reply } = req.body;

        if (!id || !reply) {
            return res.status(400).json({ status: false, message: 'id and reply is required' });
        }
        const check = await supports.findById(id);
        if (!check) {
            return res.status(400).json({ status: false, message: "doubt not found" });
        }
        const data = await supports.findByIdAndUpdate(id, { status: "solved", reply }, { new: true });
        res.status(200).json({ status: true, message: "dout upadted successfully", data });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", err: error.message });

    }

}

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status: false, message: 'id is required' });
        }
        const check = await supports.findById(id);
        if (!check) {
            return res.status(400).json({ status: false, message: "doubt not found" });
        }
        const data = await supports.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "dout deleted successfully", data });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", err: error.message });
    }

}

module.exports = {addQuestion,getQuestion,deleteQuestion,updateQuestion};