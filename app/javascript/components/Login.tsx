import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import { Container, Form, Card, Button, Alert, Row, Col } from "react-bootstrap";
import UserBar from "./UserBar";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

    }, [errorVisible]);

    function loginForm(event) {
        event.preventDefault();

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch("/login/new", {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    username: username,
                    password: password
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            if (response.success) {
                navigate("/");
            } else {
                setErrorVisible(true);
                setError(response.error);
            }
        });

    }

    function signupFormNav() {
        navigate("/signup")
    }

    const signUpButton = () => {
        if (errorVisible) {
            return (
                <Form.Group as={Col} show={errorVisible} className="mb-3" style={{textAlign: "center"}}>
                    <Button variant="outline-primary" onClick={signupFormNav}>Sign Up</Button>
                </Form.Group>
            );
        } else {
            return (<div></div>);
        }
    }

    return (
        <Container fluid style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            
            <Card style={{minWidth: '20rem', maxWidth: '20rem', padding: "1rem"}}>
                <Card.Header>Log In</Card.Header>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control placeholder="" type="text"  onChange={(event) => setUsername(event.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="" onChange={(event) => setPassword(event.target.value)}/>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" style={{textAlign: "center"}}>
                                <Button onClick={loginForm}>Log In</Button>
                            </Form.Group>
                            {signUpButton()}
                        </Row>
                        <Container>
                            <Alert style={{textAlign: "center"}} variant="danger" show={errorVisible} onClose={() => setErrorVisible(false)}>{error}</Alert>
                        </Container>
                    </Form>
            </Card>
        </Container>
    );
}


export default Login;