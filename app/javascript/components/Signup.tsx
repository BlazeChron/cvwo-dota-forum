import React, {useState} from "react"
import {Link} from "react-router-dom"

const Signup = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function signupForm(event) {
        event.preventDefault();

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
    }

    return (
        <div>
            <form onSubmit={signupForm}>
                <input name="un" onChange={(event) => setUsername(event.target.value)}/> <br/>
                <input name="pw" onChange={(event) => setPassword(event.target.value)}/>
                <button>Signup</button>
            </form>
        </div>
    );
}


export default Signup;