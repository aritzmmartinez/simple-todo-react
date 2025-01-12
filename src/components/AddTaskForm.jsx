import "./AddTaskForm.css"

const AddTaskForm = ({ inputValue, onChange, onSubmit, errorMessage, onImportTasks }) => {
    return (
        <form onSubmit={onSubmit}>
            {errorMessage && (
                <p className="error-message">{errorMessage}</p>
            )}
            <div className='input-wrapper'>
                <input
                    type="text"
                    value={inputValue}
                    onChange={onChange}
                    placeholder="Type here a new task..."
                    name="text"
                    className="input"
                />
            </div>
            <div className="button-wrapper">
                <button className='add-task-btn' type="submit"><img src="./add.svg" alt="Add Icon" />Add Task</button>
                <button className="add-task-btn" type="button" onClick={onImportTasks}><img src="./import.svg" alt="Import Icon" />Import Tasks</button>
            </div>
        </form>
    )
}

export default AddTaskForm