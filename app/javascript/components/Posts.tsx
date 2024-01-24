import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import UserBar from "./UserBar";
import { Stack, Spinner } from "react-bootstrap";

const Posts = () => {

    const [posts, setPosts] = useState<any[]>([]);

    //page loading
    const [loading, setLoading] = useState(true);

    const token: string | null | undefined = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    useEffect(() => loadPosts(""), [loading]);

    function loadPosts(tags: string): void {
        if (!token) {
            return;
        }
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
        .then((res: Response) => {
            if (res.ok) {
                setLoading(false);
                return res.json();
            }
            throw new Error("not return post res");
        })
        .then((res) => setPosts(res))
        .catch(() => "kickthemout");
        
    }

    function handleSubmit(event: React.ChangeEvent<HTMLInputElement>, tags:string) {
        event.preventDefault();
        loadPosts(tags);
    }

    const allposts: React.JSX.Element[] =  posts.map((post, index) => {
                return (
                <div>
                    <Link to={`/posts/show/${post.id}`}>{post.title}</Link>
                </div>
                );
            });
    
    if (loading) {
        return (<Spinner animation="border" role="status"></Spinner>);
    } else {
        return(
            <div>
                <UserBar submitSearch={handleSubmit}/>
                
                <Stack gap={3}>
                    {allposts}
                </Stack>
            </div>
        );
    }
};

export default Posts;