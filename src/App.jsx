import './App.css'
import TaskItem from './components/TaskItem'
import AddTaskForm from "./components/AddTaskForm"
import EditTaskModal from "./components/EditTaskModal"
import DeleteConfirmationModal from "./components/DeleteConfirmationModal"
import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

function App() {
    const [inputValue, setInputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [errorMessageModal, setErrorMessageModal] = useState('')
    const [errorApi, setErrorApi] = useState('')

    const [editTask, setEditTask] = useState(null)
    const [editText, setEditText] = useState('')
    const [showModal, setShowModal] = useState(false)

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks")
        return savedTasks ? JSON.parse(savedTasks) : []
    })

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState(null)

    function handleChange(e){
        setInputValue(e.target.value)
        setErrorMessage('')
    }

    {/* Add a task */}
    function handleSubmit(e){
        e.preventDefault()
        if (inputValue.trim() === '') {
            setErrorMessage('Please enter a task')
            return
        }

        const newTask = {
            id: Date.now(),
            text: inputValue,
            completed: false,
        }

        setTasks([...tasks, newTask])
        setInputValue('')
        setErrorMessage('')
    }

    {/* Delete a task */}
    function handleDelete(id) {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    {/* Delete confirmation */}
    const handleDeleteConfirmation = (task) => {
        setTaskToDelete(task)
        setShowDeleteModal(true)
    }

    {/* Confirm delete task */}
    const confirmDelete = () => {
        setTasks(tasks.filter((task) => task.id !== taskToDelete.id))
        setShowDeleteModal(false)
        setTaskToDelete(null)
    }

    {/* EditText of edit task modal */}
    function handleEditChange(e) {
        setEditText(e.target.value)
        setErrorMessageModal('')
    }

    {/* Edit a task */}
    function handleEdit(id) {
        const taskToEdit = tasks.find((task) => task.id === id)
        setEditTask(taskToEdit)
        setEditText(taskToEdit.text)
        setShowModal(true)
    }

    {/* Save the changes of the edited task */}
    function handleSave() {
        if (editText.trim() !== '') {
            setTasks(tasks.map((task) =>
                task.id === editTask.id ? { ...task, text: editText } : task
            ))
            setShowModal(false)
        } else {
            setErrorMessageModal('You must enter a task')
        }
    }

    {/* Close edit task modal */}
    function handleClose() {
        setShowModal(false)
        setErrorMessageModal('')
    }

    {/* Mark a task as completed */}
    function handleComplete(id) {
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
        confetti()
    }

    {/* Filter tasks -> Pending & Completed */}
    const pendingTasks = tasks.filter((task) => !task.completed)
    const completedTasks = tasks.filter((task) => task.completed)

    {/* Import Tasks from API */}
    const importTasks = async () => {
        try {
            {/* Limited to 10 objects for testing purposes */}
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            const data = await response.json()
            console.log(data)

            const importedTasks = data.map((todo) => ({
                id: todo.id,
                text: todo.title,
                completed: todo.completed,
            }))
    
            {/* Filter unique tasks in order to prevent any error when trying to delete or modify the task 
                because in this case the imported tasks will have everytime the same ID (it is always the same response from the API) */}
            const uniqueTasks = importedTasks.filter(
                (importedTask) => !tasks.some((task) => task.id === importedTask.id)
            )

            setTasks((prevTasks) => [...prevTasks, ...uniqueTasks])

        } catch (error) {
            console.error('Something occur while loading tasks: ', error)
            setErrorApi('Something occur while loading tasks: ' + error)
            {errorApi && (
                <p className="error-message">{errorApi}</p>
            )}
        }
    }

    return (
        <>
            <div className='background-container'></div>
            <h1 className='main-title'>To-Do List</h1>

            {/* Add task form */}
            <AddTaskForm
                inputValue={inputValue}
                onChange={handleChange}
                onSubmit={handleSubmit}
                errorMessage={errorMessage}
                onImportTasks={importTasks}
            />

            {/* Pending tasks */}
            {pendingTasks.length > 0 && (
                <div className="task-section">
                    <h2 className='subtitle'>Pending Tasks</h2>
                    <div className="task-list">
                            {pendingTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    // onDelete={handleDelete}
                                    onDelete={() => handleDeleteConfirmation(task)}
                                    onEdit={handleEdit}
                                    onComplete={handleComplete}
                                />
                            ))}
                    </div>
                </div>
            )}

            {/* Completed tasks */}
            {completedTasks.length > 0 && (
                <div className="task-section">
                    <h2 className='subtitle'>Completed Tasks</h2>
                    <div className="task-list">
                        {completedTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                onComplete={handleComplete}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Edit task modal */}
            <EditTaskModal
                show={showModal}
                onHide={handleClose}
                editText={editText}
                onEditChange={handleEditChange}
                onSave={handleSave}
                errorMessage={errorMessageModal}
            />

            {/* Delete task confirmation modal */}
            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </>
    )
}

export default App