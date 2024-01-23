//for the login signup and displaying current user
import React, {useState, useEffect} from "react"
import { Navbar, NavDropdown, Container, Nav, Form, Button } from "react-bootstrap";
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

    function login(){
        navigate("/login");
    }
    function signup(){
        navigate("/signup");
    }

    if (username !== "") {  //logged in
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand>Dota Forum</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Form className='d-flex'>
                        <Form.Control placeholder="Enter tags" onChange={(event) => setTags(event.target.value)}/>
                        <Button className="rounded-pill" variant="outline-primary" onClick={(event) => submitSearch(event, tags)}>Search</Button>
                    </Form>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <NavDropdown title={username} menuVariant="dark">
                                <NavDropdown.Item>Thing</NavDropdown.Item>
                                <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    } else {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand>Dota Forum</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Form className='d-flex'>
                        <Form.Control placeholder="Enter tags" onChange={(event) => setTags(event.target.value)}/>
                        <Button className="rounded-pill" variant="outline-primary" onClick={(event) => submitSearch(event, tags)}>Search</Button>
                    </Form>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            
                            <Nav.Link onClick={signup}>Sign up</Nav.Link>
                            <Nav.Link onClick={login}>Log in</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
    
};

export default UserBar;