const mongoose = require('mongoose');

const addAttendance = async (req, res) => {
    const { enrollment_id, status } = req.body;
    if (!enrollment_id || !status) {
        return res.status(404).json({ status: false, message: "All feilds are required !" })
    }

    

}
