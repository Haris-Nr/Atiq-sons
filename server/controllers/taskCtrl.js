const Task = require('../models/taskModel');
const { errorHandlerMiddleware } = require('../middlewares/authMiddleware');

const createTask = async (req, res, next) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(errorHandlerMiddleware(500, 'Error creating Task'));
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return next(errorHandlerMiddleware(404, 'Task not found!'));
    }
    res.status(200).send('Task has been deleted!');
  } catch (error) {
    next(errorHandlerMiddleware(500, 'Error deleting Task'));
  }
};

const getTask = async (req, res, next) => {
  try {
    const foundTask = await Task.findById(req.params.id);
    if (!foundTask) {
      return next(errorHandlerMiddleware(404, 'Task not found!'));
    }
    res.status(200).json(foundTask);
  } catch (error) {
    next(errorHandlerMiddleware(500, 'Error fetching Task'));
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    if (!tasks || tasks.length === 0) {
      return next(errorHandlerMiddleware(404, 'No tasks found!'));
    }
    res.status(200).json(tasks);
  } catch (error) {
    next(errorHandlerMiddleware(500, 'Error fetching Tasks'));
  }
};

module.exports = {
  createTask,
  deleteTask,
  getTask,
  getTasks,
};
