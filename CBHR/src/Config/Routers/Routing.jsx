import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../Screens/Auth/Login/Login";
import Register from "../../Screens/Auth/Register/Register";
import Student from "../../Screens/Student/Student";
import Admin from "../../Screens/Admin/Admin";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
