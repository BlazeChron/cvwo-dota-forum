import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

const Signup = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function signupForm(event) {
        event.preventDefault();
        if (password === "") {      //if you're reading this I forgot to add a better implementation
            alert("Password cannot be empty");
            return;
        }
        const token = document.querySelector('meta[name="csrf-token"]').content;
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
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            if (response.success) {
                navigate("/login");
            } else {
            }
        });
    }

    return (
        <div>
            <form onSubmit={signupForm}>
                <input name="un" onChange={(event) => setUsername(event.target.value)}/> <br/>
                <input name="pw" type ="password" onChange={(event) => setPassword(event.target.value)}/>
                <button>Signup</button>
            </form>
        </div>
    );
}


export default Signup;