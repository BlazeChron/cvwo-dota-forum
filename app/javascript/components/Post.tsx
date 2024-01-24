import React, {useState, useEffect} from "react"
import {Params, useParams, useNavigate, NavigateFunction} from "react-router-dom"
import { Spinner, Stack, Card, Container, Modal, Button, ModalTitle, Form } from 'react-bootstrap';
import CommentCard from "./CommentCard";

const Post: () => React.JSX.Element = () => {
    let params: Readonly<Params<string>> = useParams();
    const postDataUrl: string = `/posts/show/data/${params.postId}`
    const [article, setArticle] = useState<any>([]);
    const [comments, setComments] = useState<any[]>([]);
    const navigate: NavigateFunction = useNavigate();

    //editing post
    const checkUserUrl: string = `/posts/isOriginalPoster/${params.postId}`
    const [showEditPost, setShowEditPost] = useState(false);

    //creating comment
    const [showEditComment, setShowEditComment] = useState(false);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [commentBody, setCommentBody] = useState("");

    //page loading
    const [loading, setLoading] = useState(true);

    const token: string | null | undefined = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    
    useEffect(() => {

        let loadState: number = 0;

        fetch(postDataUrl)
        .then((res: Response) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("not return post res");
        })
        .then((res) => {
            setArticle(res);
            loadState += 1;
            finishedLoading(loadState);
        })
        .catch(() => "kickthemout");
        
        fetch(`/comments/show/${params.postId}`)
        .then((res: Response) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("not return post res");
        })
        .then((res) => {
            setComments(res);
            loadState += 1;
            finishedLoading(loadState);
        })
        .catch(() => "kickthemout");
        
    }, [loading]);

    function finishedLoading(state:number): void{
        if (state >= 2) {
            setLoading(false);
        }
    }

    function deleteAction(): void {
        if (!token) {
            return;
        }
        fetch(`/posts/delete/${params.postId}`, {
            method: "DELETE",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            }})
        .then((res: Response) => {
            if (res.ok) {
                navigate("/");
            }
            throw new Error("failed res");
        })
    }
    function savePost(): void {
        if (!token) {
            return;
        }
        fetch(`/posts/update/${params.postId}`, {
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
        .then((res: Response) => {
            if (res.ok) {
                window.location.reload();
            }
            throw new Error("not return post res");
        })
    }

    const stopEditPost: () => void = () => setShowEditPost(false);

    const editPost: () => void = () => {
        fetch(checkUserUrl)
        .then((res: Response) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("not return post res");
        })
        .then((res) => {
            if (res.success) {
                setTitle(article.title);
                setBody(article.body);
                setTags(article.tags);
                setShowEditPost(true);
            } else {
                alert("You may not edit this post")
            }
        })
    };

    function addComment(event): void {
        if (!token) {
            return;
        }
        event.preventDefault();
        fetch(`/comments/create/${params.postId}`, {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    comment: {
                        body: commentBody
                    }
            })
        })
        .then((res: Response) => {
            if (res.ok) {
                window.location.reload();
            }
            throw new Error("not return post res");
        })
    }
    const startEditComment: () => void = () => setShowEditComment(true);
    const stopEditComment: () => void = () => setShowEditComment(false);

    const allcomments: React.JSX.Element[] = comments.map((thing, index) =>
    <div>
        <CommentCard username={thing.original_poster} body={thing.body} id={thing.id} />
    </div>
    );

    if (loading) {
        return (<Spinner animation="border" role="status"></Spinner>);
    } else {
        return (
            <Container fluid>
                <Card style={{padding: "1rem", margin: "1rem", gap: "0.5rem"}}>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Subtitle>Posted by: {article.original_poster}</Card.Subtitle>
                    <Card.Text>Tags: {article.tags}</Card.Text>
                    <Card style={{padding: "1rem"}} border="secondary">
                        <Card.Text>{article.body}</Card.Text>
                    </Card>
                    <Button style={{alignSelf: "end"}} className="rounded-pill" variant="outline-primary" onClick={editPost}>Edit</Button>
                </Card>
                <Button onClick={startEditComment}>Add Comment</Button>
                <Stack gap={3}>
                    {allcomments}
                </Stack>

                <Modal show={showEditPost} onHide={stopEditPost}>
                    <Modal.Header closeButton>
                        <ModalTitle>Edit Post</ModalTitle>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Control value={title} onChange={(event) => setTitle(event.target.value)}></Form.Control>
                        <Form.Group className="mb-3">
                        <Form.Control as="textarea" rows={3} onChange={(event) => setBody(event.target.value)}>{body}</Form.Control>
                        <Form.Control value={tags} onChange={(event) => setTags(event.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={deleteAction}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={savePost}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditComment} onHide={stopEditComment}>
                    <Modal.Header closeButton>
                        <ModalTitle>Edit Comment</ModalTitle>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                        <Form.Label>{body}</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(event) => setCommentBody(event.target.value)}/>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={(event) => addComment(event)}>
                        Post
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

export default Post;