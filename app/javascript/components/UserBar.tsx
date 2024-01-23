//for the login signup and displaying current user
import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const UserBar = () => {

    const [username, setUsername] = useState("");

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
        .then((response) => window.location.reload());
    }

    if (username !== "") {  //logged in
        return (
            <div>
                <h1>{username}</h1>
                <button onClick={signOut}>Sign out</button>
                <Link to={"/posts/new"}>New Post</Link>
            </div>
        );
    } else {
        return (
            <div>
                <Link to={"/signup"}>Sign up</Link>
                <Link to={"/login"}>Log in</Link>
            </div>
        );
    }
    
};

export default UserBar;