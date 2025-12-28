import './TaskCard.css';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const statusColors = {
    pending: '#fbbf24',
    in_progress: '#3b82f6',
    done: '#10b981',
  };

  const statusLabels = {
    pending: 'Pending',
    in_progress: 'In Progress',
    done: 'Done',
  };

  const handleStatusChange = (newStatus) => {
    onUpdate(task.id, { ...task, status: newStatus });
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div
          className="task-status-badge"
          style={{ backgroundColor: statusColors[task.status] }}
        >
          {statusLabels[task.status]}
        </div>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-date">
        {new Date(task.created_at).toLocaleDateString()}
      </div>
      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="task-status-select"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button onClick={() => onDelete(task.id)} className="task-delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
