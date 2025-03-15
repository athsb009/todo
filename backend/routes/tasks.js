const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');


router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/', auth, async (req, res) => {
  const { title } = req.body;
  try {
    const newTask = new Task({ user: req.user.id, title });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.put('/:id', auth, async (req, res) => {
  const { title, completed } = req.body;
  const taskFields = {};
  if (title) taskFields.title = title;
  if (typeof completed !== 'undefined') taskFields.completed = completed;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });
    
    task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });
    
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
