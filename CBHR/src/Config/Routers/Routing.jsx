import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../Screens/Auth/Login/Login";
import Register from "../../Screens/Auth/Register/Register";
import Student from "../../Screens/Student/Student";
import Admin from "../../Screens/Admin/Admin";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import NotFoundPage from "../../Status404";
import HR from "../../Screens/Student/HR/HR";
import Course from "../../Screens/Student/course/Course";
import AddCourse from "../../Screens/Admin/addCourse/AddCourse";
import AllCourses from "../../Screens/Admin/allCourses/AllCourses";
import AllStudent from "../../Screens/Admin/allStudents/AllStudent";
import SingleCourse from "../../Screens/Admin/allCourses/SingleCourse";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes component={<Student />} />}>
          <Route path="" element={<HR />} />
          <Route path="course" element={<Course />} />
        </Route>
        <Route path="admin" element={<ProtectedRoutes component={<Admin />} />}>
          <Route path="" element={<AddCourse />} />
          <Route path="allcourses" element={<AllCourses />} />
          <Route path="allcourses/:id" element={<SingleCourse />} />
          <Route path="allstudents" element={<AllStudent />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
