import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

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
        <div>
            <Form>
                <Form.Control placeholder="Title" onChange={(event) => setTitle(event.target.value)}/>
                <Form.Control as="textarea" placeholder="Speak your mind" onChange={(event) => setBody(event.target.value)}/>
                <Form.Control placeholder="Tags" onChange={(event) => setTags(event.target.value)}/>
                <Button className="rounded-pill" variant="outline-primary" onClick={submitPost}>Submit</Button>
            </Form>
        </div>
    );
}

export default PostNew;