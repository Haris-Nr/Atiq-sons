const Log = require("../models/logModel");

const getAllLogs = async (req, res) => {
    try {
        // Populate user information using the "user_id" field in the Log model
        const allLogs = await Log.find().populate("user_id");

        res.json({
            success: true,
            data: allLogs,
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { getAllLogs };
