//for the login signup and displaying current user
import React, {useState, useEffect} from "react"
import { Navbar, NavDropdown, Container, Nav, Form, Button, NavLink } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom"

const UserBar = ({submitSearch}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => { loadUserBar() }, []);

    function loadUserBar() {
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch("/login/queryUser", {
            method: "GET",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            if (response.username) {
                setUsername(response.username);
            } else {
                setUsername("");
            }
        });
    }

    function signOut(event) {
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch("/login/destroy", {
            method: "GET",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            },
        })
        .then((response) => {
            setUsername("");
            window.location.reload();
        });
    }

    function home(){
        navigate("/");
    }

    function login(){
        navigate("/login");
    }
    function signup(){
        navigate("/signup");
    }
    function newPost(){
        navigate("/posts/new");
    }

    const signInNavBar = () => {
        if (username !== "") {
            return(
            <Nav>
                <Nav.Link onClick={newPost}>New Post</Nav.Link>
                <NavDropdown title={username} menuVariant="dark">
                    <NavDropdown.Item>Thing</NavDropdown.Item>
                    <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
                </NavDropdown>
            </Nav>
            );
        } else {
            return (
                <Nav>
                    <Nav.Link onClick={signup}>Sign up</Nav.Link>
                    <Nav.Link onClick={login}>Log in</Nav.Link>
                </Nav>
            );
        }
    }

        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand onClick={home}>
                        <img src={"/images/dota-logo.jpg"} style={{maxHeight: "2rem"}}/>
                        Dota Forum
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                    <Form className='d-flex'>
                        <Form.Control placeholder="Enter tags" onChange={(event) => setTags(event.target.value)}/>
                        <Button className="rounded-pill" variant="outline-primary" onClick={(event) => submitSearch(event, tags)}>Search</Button>
                    </Form>
                    <Navbar.Collapse className="justify-content-end">
                        {signInNavBar()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    
};

export default UserBar;