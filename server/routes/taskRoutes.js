const express = require("express");
// const { verifyToken } = require('../middlewares/authMiddleware');
const { createTask, deleteTask, getTask, getTasks } = require('../controllers/taskCtrl');

const router = express.Router();

router.post("/",createTask);
router.delete("/:id",deleteTask);
router.get("/single/:id", getTask);
router.get("/", getTasks);

module.exports = router;
