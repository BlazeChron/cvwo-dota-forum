import React, {useState} from "react"
import {Link} from "react-router-dom"

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function signupForm(event) {
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
    }

    function queryUser() {
        let g = 0;
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch("/login/queryUser", {
            method: "GET",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            },
        }).then((response) => {if (response.ok) {
            alert("response ok")
            return response.json();
        }}).then((response) => {g = response.user_id
            
        alert(g);
        });

    }

    return (
        <div>
            <form onSubmit={signupForm}>
                <input name="un" onChange={(event) => setUsername(event.target.value)}/> <br/>
                <input type ="password" name="pw" onChange={(event) => setPassword(event.target.value)}/>
                <button>Roggin</button>
            </form>


            <button onClick={queryUser}>Click for user</button>
        </div>
    );
}


export default Login;