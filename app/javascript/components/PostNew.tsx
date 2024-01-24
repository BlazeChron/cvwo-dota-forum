import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from 'react-bootstrap';

const PostNew = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");

    function submitPost(event) {
        event.preventDefault();

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch("/posts/create", {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    title: title,
                    body: body,
                    tags: tags
            })
        })
        .then((res) => {
            if (res.ok) {
                navigate("/");
            }
            throw new Error("not return post res");
        })
    }

    return (
        <Card style={{minWidth: '20rem', maxWidth: '50rem', padding: "1rem"}}>
            <Form>
                <Form.Label>New Post</Form.Label>
                <Form.Group className="mb-3">
                    <Form.Control placeholder="Title" onChange={(event) => setTitle(event.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control as="textarea" rows={3} placeholder="Enter what you want to say here" onChange={(event) => setBody(event.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control placeholder="Tags" onChange={(event) => setTags(event.target.value)}/>
                </Form.Group>
                <Button className="rounded-pill" variant="outline-primary" onClick={submitPost}>Submit</Button>
            </Form>
        </Card>
    );
}

export default PostNew;