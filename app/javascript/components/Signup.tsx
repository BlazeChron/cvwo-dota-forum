import React, {useState} from "react"
import { Container, Form, Card, Button, Alert, Row, Col } from "react-bootstrap";
import {useNavigate, NavigateFunction} from "react-router-dom"

const Signup = () => {

    const navigate: NavigateFunction = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [error, setError] = useState("");

    const token: string | null | undefined = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    function signupForm(): void {
        if (!token) {
            return;
        }
        if (password === "") {
            setError("Password cannot be empty");
            setErrorVisible(true);
            return;
        }
        if (username === "") {
            setError("Username cannot be empty");
            setErrorVisible(true);
            return;
        }
        fetch("/signup/new", {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            if (response.success) {
                navigate("/login");
            } else {
                setErrorVisible(true);
                setError(response.error);
            }
        });
    }
    
    function loginFormNav(): void {
        navigate("/login")
    }

    const logInButton: () => React.JSX.Element = () => {
        if (errorVisible) {
            return (
                <Form.Group as={Col} show={errorVisible} className="mb-3" style={{textAlign: "center"}}>
                    <Button variant="outline-primary" onClick={loginFormNav}>Log In</Button>
                </Form.Group>
            );
        } else {
            return (<div></div>);
        }
    }


    return (
        <Container fluid style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            
            <Card style={{minWidth: '20rem', maxWidth: '20rem', padding: "1rem"}}>
                <Card.Header>Sign Up</Card.Header>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control placeholder="eg. DrowRanger1979" type="text"  onChange={(event) => setUsername(event.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(event) => setPassword(event.target.value)}/>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" style={{textAlign: "center"}}>
                                <Button onClick={signupForm}>Sign Up</Button>
                            </Form.Group>
                            {logInButton()}
                        </Row>
                        <Container>
                            <Alert style={{textAlign: "center"}} variant="danger" show={errorVisible} onClose={() => setErrorVisible(false)}>{error}</Alert>
                        </Container>
                    </Form>
            </Card>
        </Container>
    );
}


export default Signup;