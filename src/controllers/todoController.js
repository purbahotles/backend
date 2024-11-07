const { Todo } = require("../models/db");
const logger = require('../logger'); // Assuming you have a logger

exports.createToDo = async (req, res) => {
  try {
    const activities_no = `AC-${Math.floor(1000 + Math.random() * 9000)}`; // Generate unique ID
    const { subject, description } = req.body;

    // Validasi input
    if (!subject || !description) {
      return res.status(400).json({ error: "Subject and description are required." });
    }

    // console.log("Request body:", req.body);
    // console.log("User ID from request:", req.user.id);

    // Buat To-Do
    const todo = await Todo.create({
      activities_no,
      subject,
      description,
      userId: req.user.id,
    });

    logger.info(`To-Do created: ${todo.activities_no}`);
    
    // Kirim response hanya sekali
    return res.status(200).json(todo);
  } catch (error) {
    logger.error(`To-Do creation failed: ${error.message}`);
    if (!res.headersSent) { // Memastikan headers belum dikirim
      return res.status(500).json({ error: "To-Do creation failed" });
    }
  }
};



exports.getToDos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    logger.info(`Successfully retrieved To-Dos: ${todos.length} items found.`);
    res.json(todos);
  } catch (error) {
    logger.error(`Failed to retrieve To-Dos for user ${req.user.id}: ${error.message}`);
    res.status(500).json({ error: "Failed to retrieve To-Dos" });
  }
};

exports.markToDo = async (req, res) => {
  try {
    const { activities_no, status } = req.body;

    const todo = await Todo.findOne({ where: { activities_no, userId: req.params.id } });
    
    if (!todo) {
      return res.status(404).json({ error: "To-Do not found" });
    }

    todo.status = status; // Update status
    await todo.save();

    logger.info(`To-Do marked: ${todo.activities_no} as ${status}`);
    res.json(todo);
  } catch (error) {
    logger.error(`Failed to mark To-Do: ${error.message}`);
    res.status(500).json({ error: "Failed to mark To-Do" });
  }
};

// Mark To-Do as Done or Canceled
exports.markToDo = async (req, res) => {
  const { id } = req.params; // activities_no
  const { status } = req.body; // expect status to be either 'Done' or 'Canceled'

  try {
    logger.info(`Marking To-Do: ${id} with status: ${status} for user: ${req.user.id}`);
    const todo = await Todo.findOne({ where: { activities_no: id, userId: req.user.id } });

    // if (!todo || todo.status === 'Unmarked') {
    //   return res.status(404).json({ error: "To-Do not found or not modifiable" });
    // }

    // // Update the status
    // if (status !== 'Done' && status !== 'Canceled') {
    //   return res.status(400).json({ error: "Invalid status. Must be 'Done' or 'Canceled'." });
    // }

    todo.status = status;
    await todo.save();

    logger.info(`To-Do marked: ${todo.activities_no} as ${status}`);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark To-Do' });
  }
};



// Update To-Do
exports.updateToDo = async (req, res) => {
  const { id } = req.params; // activities_no
  const { subject, description } = req.body;

  try {
    logger.info(`Updating To-Do: ${id} for user: ${req.user.id}`);
    const todo = await Todo.findOne({ where: { activities_no: id, userId: req.user.id } });

    if (!todo || todo.status !== 'Unmarked') {
      return res.status(404).json({ error: "To-Do not found or not modifiable" });
    }

    // Update fields
    todo.subject = subject;
    todo.description = description;
    await todo.save();

    logger.info(`To-Do updated: ${todo.activities_no}`);
    res.json(todo);
  } catch (error) {
    logger.error(`Failed to update To-Do: ${error.message}`);
    res.status(500).json({ error: 'Failed to update To-Do' });
  }
};


// Delete To-Do
exports.deleteToDo = async (req, res) => {
  const { id } = req.params; // activities_no

  try {
    logger.info(`Deleting To-Do: ${id} for user: ${req.user.id}`);
    const todo = await Todo.findOne({ where: { activities_no: id, userId: req.user.id } });

    if (!todo || todo.status !== 'Unmarked') {
      logger.warn(`To-Do not found or cannot be deleted: ${id}`);
      return res.status(404).json({ error: "To-Do not found or cannot be deleted" });
    }

    await todo.destroy();
    logger.info(`To-Do deleted: ${id}`);
    res.status(204).send(); // No Content
  } catch (error) {
    logger.error(`Failed to delete To-Do: ${error.message}`);
    res.status(500).json({ error: 'Failed to delete To-Do' });
  }
};

