const Task = require('../models/taskModels');


const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
   console.log(error)
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      console.log(error)
    }
    res.status(200).send('Task has been deleted!');
  } catch (error) {
    console.log(error)
  }
};

const getTask = async (req, res, next) => {
  try {
    const foundTask = await Task.findById(req.params.id);
    if (!foundTask) {
      console.log(error)
    }
    res.status(200).json(foundTask);
  } catch (error) {
    console.log(error)
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks || tasks.length === 0) {
      console.log(error)
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  createTask,
  deleteTask,
  getTask,
  getTasks,
};
