import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import UserBar from "./UserBar";
import { Button, Form, Stack } from "react-bootstrap";

const Posts = () => {

    const [posts, setPosts] = useState<any[]>([]);
    const [tags, setTags] = useState("");

    useEffect(() => loadPosts(tags), []);

    function loadPosts(tags) {
        const token = document.querySelector('meta[name="csrf-token"]').content;
            fetch("/posts/search", {
                method: "POST",
                headers: {
                    'X-CSRF-TOKEN': token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        tags: tags
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("not return post res");
            })
            .then((res) => setPosts(res))
            .catch(() => "kickthemout");
        
    }

    function handleSubmit(event) {
        event.preventDefault();
        loadPosts(tags);
    }

    const allposts =  posts.map((post, index) => {
                return (
                <div>
                    <Link to={`/posts/show/${post.id}`}>{post.title}</Link>
                </div>
                );
            });
    
    return(
    <div>
        <UserBar />
        <Form>
            <Form.Control placeholder="Enter tags" onChange={(event) => setTags(event.target.value)}/>
            <Button className="rounded-pill" variant="outline-primary" onClick={handleSubmit}>Search</Button>
        </Form>
        <Stack gap={3}>
            {allposts}
        </Stack>
    </div>
    );
};

export default Posts;