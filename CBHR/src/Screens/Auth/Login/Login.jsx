import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import logo from "../../../assests/logo.jpg";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { Card, IconButton, InputAdornment } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import Loader from "../../../Components/Loader";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup.string().email().required("email is required"),
    password: yup.string().min(6).required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (v) => {
      try {
        setloader(true);
        await axios
          .put(import.meta.env.VITE_API + "users/login", {
            email: v.email,
            password: v.password,
          })
          .then(async (res) => {
            setloader(false);
            const token = await res.data?.token;
            const type = await res.data?.user?.type;
            localStorage.setItem("token", token);
            localStorage.setItem("type", type);
            await Swal.fire({
              position: "top-end",
              icon: "success",
              title: res.data?.message,
              showConfirmButton: false,
              timer: 1500,
            });

            if (res.data?.user?.type == "student") {
              navigate("/");
            } else if (res.data?.user?.type == "admin") {
              navigate("/admin");
            }
          })
          .catch(async (e) => {
            setloader(false);
            await Swal.fire({
              icon: "error",
              text: e.response?.data?.message,
            });
          });
      } catch (e) {
        await Swal.fire({
          icon: "error",
          text: e.response?.data?.message,
        });
      }
    },
  });

  return (
    <Box>
      <Container component="main" sx={{ maxWidth: "550px" }} maxWidth={false}>
        <Card sx={{ p: 4, mt: 8 }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={logo}
              sx={{
                m: 1,
                width: "120px",
              }}
            />

            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
              noValidate
              sx={{ mt: 4 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In {loader ? <Loader color={"white"} size={20} /> : null}
              </Button>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Box></Box>
                <Box>
                  <Link
                    to="/register"
                    variant="body2"
                    style={{ textDecoration: "none", color: "#1976d2" }}
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
