import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "../components/Posts";

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Posts />} />
        </Routes>
    </Router>
);