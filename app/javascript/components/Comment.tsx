import React, {useState} from 'react'
import { Link, Navigate, useNavigate, useParams} from "react-router-dom";

const Comment = () => {
    let params = useParams();
    const url = `/comments/delete/${params.commentId}`
    const postUrl = `/`
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    function deletePost(event) {
        event.preventDefault();

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "DELETE",
            headers: {
                'X-CSRF-TOKEN': token,
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            if (res.ok) {
                
            }
            throw new Error("not return post res");
        })
    }


    return (
        <div>
            <text>Hello Worlds</text>

            <form onSubmit={deletePost}>
                <div>
                    <label>Enter Body:
                        <input name="baka" onChange={(event) => setBody(event.target.value)}></input>
                    </label>
                    <button>Delete</button>
                </div>

            </form>
        </div>
    );
}

export default Comment;