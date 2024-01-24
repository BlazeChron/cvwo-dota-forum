import React, {useState, useEffect} from "react";
import {useNavigate, NavigateFunction} from "react-router-dom"
import { Card, Button, CardHeader, CardText } from "react-bootstrap";

const PostCard: ({ id, title, body, original_poster }: {
    id: number;
    title: string;
    body: string;
    original_poster: string;
}) => React.JSX.Element = ({id, title, body, original_poster}) => {

    const navigate: NavigateFunction = useNavigate();
    const navUrl: string = `/posts/show/${id}`
    
    function goToPost(): void {
        navigate(navUrl);
    }

    return (
        <Button variant="dark" style={{maxWidth: "50rem", minHeight: "1rem"}} onClick={goToPost}>
            <Card bg="light" text={"dark"} style={{textAlign: "start"}}>
                <CardHeader>{title}</CardHeader>
                <CardText style={{margin: "0.5rem", textOverflow: "ellipsis", minHeight: "1rem", maxHeight: "3rem", overflow: "hidden", whiteSpace: "nowrap"}}>{body}</CardText>
            </Card>
        </Button>
    );
};

export default PostCard;