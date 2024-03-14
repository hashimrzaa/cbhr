import React, { useEffect, useState } from "react";
import Loader from "../../Components/Loader";
import Navbar from "../../Components/Navbar";
import { CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Admin from "../../Screens/Admin/Admin";

const ProtectedRoutes = ({ component }) => {
  const navigate = useNavigate();
  const [isUser, setisUser] = useState(false);
  const token = localStorage.getItem("token");
  const type = localStorage.getItem("type");

  useEffect(() => {
    if (token) {
      setisUser(true);
    } else {
      setisUser(false);
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (isUser && type === "admin") {
      navigate("/admin");
    } else if (isUser && type === "student") {
      navigate("/");
    }
  }, [isUser, type, navigate]);

  return (
    <>
      <CssBaseline />
      <Navbar />
      {isUser ? (
        component
      ) : (
        <div style={{position:"absolute",left:'45%',top:'50%'}}>
          <Loader size={50} mt={"50vh"} />
        </div>
      )}
    </>
  );
};

export default ProtectedRoutes;
