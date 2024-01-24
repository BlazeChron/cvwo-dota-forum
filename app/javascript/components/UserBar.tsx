//for the login signup and displaying current user
import React, {useState, useEffect} from "react"
import { Navbar, NavDropdown, Container, Nav, Form, Button, InputGroup } from "react-bootstrap";
import {NavigateFunction, useNavigate} from "react-router-dom"

const UserBar = ({submitSearch}) => {
    const navigate: NavigateFunction = useNavigate();
    const [username, setUsername] = useState("");
    const [tags, setTags] = useState("");

    const token: string | null | undefined = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    useEffect(() => { loadUserBar() }, []);

    function loadUserBar(): void {
        if (!token) {
            return;
        }
        fetch("/login/queryUser", {
            method: "GET",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            },
        })
        .then((response: Response) => {
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

    function signOut(): void {
        if (!token) {
            return;
        }
        fetch("/login/destroy", {
            method: "GET",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            },
        })
        .then((response: Response) => {
            setUsername("");
            window.location.reload();
        });
    }

    function home(): void{
        navigate("/");
    }

    function login(): void{
        navigate("/login");
    }
    function signup(): void{
        navigate("/signup");
    }
    function newPost(): void{
        navigate("/posts/new");
    }

    const signInNavBar: () => React.JSX.Element = () => {
        if (username !== "") {
            return(
            <Nav>
                <Nav.Link onClick={newPost}>New Post</Nav.Link>
                <NavDropdown align="end" title={username} menuVariant="dark" style={{alignContent: "front"}}>
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
                    <Form className='d-flex' onSubmit={(event) => submitSearch(event, tags)}>
                        <InputGroup>
                            <Form.Control placeholder="Enter tags" value={tags} onChange={(event) => setTags(event.target.value)}/>
                            <Button variant="secondary" onClick={(event) => submitSearch(event, tags)}>Search</Button>
                        </InputGroup>
                    </Form>
                    <Navbar.Collapse className="justify-content-end">
                        {signInNavBar()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    
};

export default UserBar;