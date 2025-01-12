import { Modal, Button, Form } from "react-bootstrap";
import "./EditTaskModal.css";

const EditTaskModal = ({
    show,
    onHide,
    editText,
    onEditChange,
    onSave,
    errorMessage }) => {
    return (
        <Modal show={show} onHide={onHide} 
        backdrop="static" 
        keyboard={false} 
        size="md" 
        aria-labelledby="contained-modal-title-vcenter" 
        centered 
        dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Edit task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control as="textarea" rows={5} cols={50}
                            value={editText}
                            onChange={onEditChange}
                            placeholder="Enter your task..."/>
                    </Form.Group>
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button className='custom-btn-modal' onClick={onSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditTaskModal