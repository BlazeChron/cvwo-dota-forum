import React, {useState, useEffect} from "react"
import {Link, useParams, useNavigate} from "react-router-dom"
import { Spinner, Stack, Card } from 'react-bootstrap';
import CommentCard from "./CommentCard";

const Post = () => {
    let params = useParams();
    const url = `/posts/show/data/${params.postId}`
    const [article, setArticle] = useState<any>([]);
    const [comments, setComments] = useState<any[]>([]);
    const navigate = useNavigate();

    
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [commentBody, setCommentBody] = useState("");

    //page loading
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {

        let loadState = 0;

        fetch(url)
        .then((res) => {
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
        .then((res) => {
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

    function finishedLoading(state:number){
        if (state >= 2) {
            setLoading(false);
        }
    }

    function deleteAction() {
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(`/posts/delete/${params.postId}`, {
            method: "DELETE",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            }})
        .then((res) => {
            if (res.ok) {
                navigate("/");
            }
            throw new Error("failed res");
        })
    }
    function editPost(event) {
        event.preventDefault();

        const token = document.querySelector('meta[name="csrf-token"]').content;
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
        .then((res) => {
            if (res.ok) {
                navigate(`/posts/show/${params.postId}`);
            }
            throw new Error("not return post res");
        })
    }

    function addComment(event) {
        event.preventDefault();

        const token = document.querySelector('meta[name="csrf-token"]').content;
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
        .then((res) => {
            if (res.ok) {
                
            }
            throw new Error("not return post res");
        })
    }

    const allcomments = comments.map((thing, index) =>
    <div>
        <CommentCard username={thing.original_poster} body={thing.body} id={thing.id} />
    </div>
    );

    if (loading) {
        return (<Spinner animation="border" role="status"></Spinner>);
    } else {
        return (
            <div>
                <h1>greetings</h1>
                <h1>{article.original_poster}</h1>
                <h2>{article.title}</h2>
                <h3>{article.body}</h3>
                <h4>{article.tags}</h4>
                <button onClick={deleteAction}>delete</button>
                <form onSubmit={editPost}>
                    <div>
                        <label>Enter Title:
                            <input name="baka" onChange={(event) => setTitle(event.target.value)}></input>
                        </label>
                        <label>Enter Body:
                            <input name="baka2" onChange={(event) => setBody(event.target.value)}></input>
                        </label>
                        <label>Enter Tags:
                            <input name="baka3" onChange={(event) => setTags(event.target.value)}></input>
                        </label>
                        <button>Submit</button>
                    </div>
                </form>


                <div>
                    <form onSubmit={addComment}>
                        <div>
                            <label>Enter Body:
                                <input name="baka4" onChange={(event) => setCommentBody(event.target.value)}></input>
                            </label>
                            <button>Submit</button>
                        </div>

                    </form>
                    </div>
                    <Stack gap={3}>
                        {allcomments}
                    </Stack>
                </div>
        );
    }
}

export default Post;