const Log = require("../models/logModel");

const getAllLogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skipIndex = (page - 1) * limit;

        const allLogs = await Log.find()
            .populate("user_id")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skipIndex);
            
        const totalCount = await Log.countDocuments();

        res.json({
            success: true,
            data: allLogs,
            pageInfo: {
                totalItems: totalCount,
                currentPage: page,
                itemsPerPage: limit,
                totalPages: Math.ceil(totalCount / limit),
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { getAllLogs };
