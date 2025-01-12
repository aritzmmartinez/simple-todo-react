import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, onHide, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide} 
        backdrop="static" 
        centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete the task?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="danger" onClick={onConfirm}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmationModal