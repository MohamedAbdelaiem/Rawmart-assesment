import Task from '../models/Task.js';
import { taskSchema } from '../schemas/taskSchema.js';
// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.user);
    console.log(req.body);
    const userId = req.user.id;
    const validate = taskSchema.safeParse({ title, description , status: 'pending' });
    if (!validate.success) {
      return res.status(400).json({ error: validate.error.errors[0].message });
    }

    const task = await Task.create(userId, title, description);
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
};

// Get all tasks for the current user
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const tasks = await Task.findByUserId(userId);
    res.json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

// Get a single task by ID
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const task = await Task.findById(id, userId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Error fetching task' });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { title, description, status } = req.body;
    if (!title && !description && !status) {
      return res.status(400).json({ error: 'At least one field is required' });
    }
    const validate = taskSchema.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({ error: validate.error.errors[0].message });
    }

    const task = await Task.update(id, userId, validate.data);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const rowCount = await Task.delete(id, userId);

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
};
