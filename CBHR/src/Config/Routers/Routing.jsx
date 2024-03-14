import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../Screens/Auth/Login/Login";
import Register from "../../Screens/Auth/Register/Register";
import Student from "../../Screens/Student/Student";
import Admin from "../../Screens/Admin/Admin";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import NotFoundPage from "../../Status404";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes component={<Student />} />} />
        <Route
          path="/admin"
          element={<ProtectedRoutes component={<Admin />} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
