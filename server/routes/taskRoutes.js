const express = require("express");
const router = express.Router();
const { createTask, deleteTask, getTask, getTasks } = require('../controllers/taskCtrl');


router.post("/",createTask);
router.delete("/:id",deleteTask);
router.get("/single/:id", getTask);
router.get("/", getTasks);

module.exports = router;
