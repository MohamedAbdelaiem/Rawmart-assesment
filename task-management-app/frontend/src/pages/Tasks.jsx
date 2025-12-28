import { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data.tasks);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    const titleValid = newTask.title.trim().length >= 3 && newTask.title.trim().length <= 128;
    const descriptionValid = 
      newTask.description.trim() === '' || // Empty is ok (optional)
      (newTask.description.trim().length >= 3 && newTask.description.trim().length <= 1000);
    return titleValid && descriptionValid;
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask(newTask);
      setNewTask({ title: '', description: '' });
      setShowForm(false);
      setCurrentPage(1); // Reset to first page when new task is created
      loadTasks();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      await taskService.updateTask(id, updatedTask);
      loadTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        loadTasks();
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  // Pagination calculations
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="tasks-loading">Loading tasks...</div>;
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>My Tasks</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="tasks-add-btn"
        >
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {error && <div className="tasks-error">{error}</div>}

      {showForm && (
        <form onSubmit={handleCreateTask} className="task-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Task title *"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
            />
            <small className="form-hint">3-128 characters required</small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="Task description (optional)"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              rows="3"
            />
            <small className="form-hint">
              Optional: max 1000 characters if provided
            </small>
          </div>
          <button 
            type="submit" 
            className="task-form-btn"
            disabled={!isFormValid()}
          >
            Create Task
          </button>
        </form>
      )}

      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <div className="tasks-empty">
            <p>No tasks yet. Create your first task!</p>
          </div>
        ) : (
          currentTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {tasks.length > tasksPerPage && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
