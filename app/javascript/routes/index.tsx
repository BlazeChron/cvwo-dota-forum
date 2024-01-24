import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "../components/Posts";
import PostNew from "../components/PostNew";
import Post from "../components/Post";
import Signup from "../components/Signup";
import Login from "../components/Login";

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts/new" element={<PostNew />} />
            <Route path="/posts/show/:postId" element={<Post />} />
        </Routes>
    </Router>
);