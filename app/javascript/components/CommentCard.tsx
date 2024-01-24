import React, {useState} from "react"
import { Button, Modal, ModalTitle, Form, Card, Container } from 'react-bootstrap';

const CommentCard: ({ username, body, id }: {
    username: any;
    body: any;
    id: any;
}) => React.JSX.Element = ({username, body, id}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [commentBody, setCommentBody] = useState("");
    
    const checkUserUrl :string = `/comments/isOriginalPoster/${id}`
    const deleteUrl :string = `/comments/delete/${id}`
    const editUrl :string = `/comments/edit/${id}`

    const token: string | null | undefined = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    const stopEditComment = () => setShowEdit(false);

    const editComment: () => void = () => {
        fetch(checkUserUrl)
        .then((res: Response) => {
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

    function saveComment(): void {
        if (!token) {
            return;
        }
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
        .then((res: Response) => {
            if (res.ok) {
                window.location.reload();
            }
            throw new Error("not return post res");
        })
    }
    
    function deleteComment() :void{
        if (!token) {
            return;
        }
        fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            }
        })
        .then((res: Response) => {
            if (res.ok) {
                window.location.reload();
            }
            throw new Error("not return post res");
        })
    }

    return (
        <Container fluid>
            <Card style={{maxWidth: "20rem", padding:"1rem"}}>
                <Card.Title>{username}:</Card.Title>
                <Card.Body>{body}</Card.Body>
                <Button style={{alignSelf: "end"}} className="rounded-pill" variant="outline-primary" onClick={editComment}>Edit</Button>
            </Card>

            <Modal show={showEdit} onHide={stopEditComment}>
                <Modal.Header closeButton>
                    <ModalTitle>Edit Comment</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Control as="textarea" rows={3} onChange={(event) => setCommentBody(event.target.value)}>{body}</Form.Control>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={(event) => deleteComment()}>
                    Delete
                </Button>
                <Button variant="primary" onClick={(event) => saveComment()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CommentCard;