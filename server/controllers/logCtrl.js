const Log = require("../models/logModel");

const getAllLogs = async (req, res) => {
    try {

       

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skipIndex = (page - 1) * limit;

        const allLogs = await Log.find()
        .populate({
            path: "user_id",
            match: { role: 'employee' }
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skipIndex)
            .exec();

             // Filter out logs with no user due to the role mismatch (i.e., admin logs)
        const filteredLogs = allLogs.filter(log => log.user_id);

        const totalCount = await Log.countDocuments({
            user_id: { $in: filteredLogs.map(log => log.user_id) }
        });

        res.json({
            success: true,
            data: filteredLogs,
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
