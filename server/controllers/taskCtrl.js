const Task = require("../models/taskModels");

const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);

    await newTask.save();

    res.status(201).json({
      success: true,
      message: "Task Asign",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      console.error("Task not found for deletion");
      return res.status(404).json({ error: "Task not found for deletion" });
    }

    res.status(200).send("Task has been deleted!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTask = async (req, res) => {
  try {
    const foundTask = await Task.findById(req.params.id);

    if (!foundTask) {
      console.error("Task not found");
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(foundTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchTasksForEmployee = async (req, res) => {
  try {
    const userId = req.body.userId
    const tasks = await Task.find({ employee: userId }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.json({
        success: false,
        message: error.message,
      });
  }
};

module.exports = {
  createTask,
  deleteTask,
  getTask,
  fetchTasksForEmployee,
};
