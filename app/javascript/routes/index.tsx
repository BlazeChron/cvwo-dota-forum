import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "../components/Posts";
import Signup from "../components/Signup";
import Login from "../components/Login";

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
);