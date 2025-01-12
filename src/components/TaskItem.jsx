import "./TaskItem.css"; 

const TaskItem = ({ task, onComplete, onDelete, onEdit }) => {
    return (
        <div className="task-container">
            <div className={`task-item ${task.completed ? 'completed' : ''}`}>
                <span>{task.text}</span>

                {!task.completed && (
                    <>
                        <button onClick={() => onComplete(task.id)}><img src="./checkmark.svg" alt="Checkmark Icon" /></button>
                        <button onClick={() => onEdit(task.id)}><img src="./edit.svg" alt="Edit Icon" /></button>
                    </>
                )}

                <button onClick={() => onDelete(task.id)}><img src="./delete.svg" alt="Delete Icon" /></button>
            </div>
        </div>
    );
};

export default TaskItem;