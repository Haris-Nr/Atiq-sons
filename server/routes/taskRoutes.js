const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminCheck = require("../middlewares/adminCheck");
const { createTask, deleteTask, getTask, fetchTasksForEmployee } = require('../controllers/taskCtrl');

router.post("/addtask",authMiddleware,adminCheck, createTask);
router.delete("/:id",authMiddleware,adminCheck, deleteTask);
router.get("/single/:id",authMiddleware, getTask);
router.get("/fetchTaskForEmployee",authMiddleware, fetchTasksForEmployee);

module.exports = router;
