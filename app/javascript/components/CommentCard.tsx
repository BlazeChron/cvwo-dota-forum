import React, {useState, useEffect} from "react"
import {Link, useParams, useNavigate} from "react-router-dom"
import { Button, Modal, ModalTitle, Form } from 'react-bootstrap';

const CommentCard = ({username, body, id}) => {
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
    const [commentBody, setCommentBody] = useState("");
    
    const checkUserUrl = `/comments/isOriginalPoster/${id}`
    const deleteUrl = `/comments/delete/${id}`
    const editUrl = `/comments/edit/${id}`

    
    const stopEditComment = () => setShowEdit(false);

    const editComment = () => {
        fetch(checkUserUrl)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("not return post res");
        })
        .then((res) => {
            if (res.success) {
                setShowEdit(true);
            } else {
                alert("You may not edit this comment")
            }
        })
    };

    function saveComment(event) {
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(editUrl, {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    body: commentBody
            })
        })
        .then((res) => {
            if (res.ok) {
                window.location.reload();
            }
            throw new Error("not return post res");
        })
    }
    
    function deleteComment(event) {
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            if (res.ok) {
                window.location.reload();
            }
            throw new Error("not return post res");
        })
    }

    return (
        <div>
            <h1>{body}</h1>
            <p>{username}</p>
            <Button  className="rounded-pill" variant="outline-primary" onClick={editComment}>Edit</Button>

            <Modal show={showEdit} onHide={stopEditComment}>
                <Modal.Header closeButton>
                    <ModalTitle>Edit Comment</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={(event) => setCommentBody(event.target.value)}/>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={deleteComment}>
                    Delete
                </Button>
                <Button variant="primary" onClick={saveComment}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CommentCard;