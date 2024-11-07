const express = require("express");
const todoController = require('../controllers/todoController');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/todos', authMiddleware, todoController.createToDo);
router.get('/todos', authMiddleware, todoController.getToDos);
router.put('/mark/:id', authMiddleware, todoController.markToDo); // Mark To-Do
router.put('/update/:id', authMiddleware, todoController.updateToDo); // Update To-Do
router.delete('/:id', authMiddleware, todoController.deleteToDo); // Delete To-Do

// Additional routes for listing, updating, and deleting To-Dos

module.exports = router;
