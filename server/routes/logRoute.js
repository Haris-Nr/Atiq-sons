const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminCheck = require("../middlewares/adminCheck");
const { getAllLogs } = require("../controllers/logCtrl");

router.get("/logs", authMiddleware, adminCheck, getAllLogs);

module.exports = router;
