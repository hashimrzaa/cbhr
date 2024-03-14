import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import logo from "../../../assests/logo.jpg";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import Loader from "../../../Components/Loader";

export default function SignIn() {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    userName: yup.string().required("UserName is required"),
    password: yup.string().min(6).required("Payment purpose is required"),
  });
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",
      type: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (v) => {
      try {
        setloader(true);
        await axios
          .post("https://cbhr.vercel.app/users/register", {
            userName: v.userName,
            email: v.email,
            password: v.password,
            type: "student",
          })
          .then(async (resr) => {
            // console.log(resr);

            await axios
              .put("https://cbhr.vercel.app/users/login", {
                email: v.email,
                password: v.password,
              })
              .then(async (resl) => {
                const token = await resl.data?.token;
                const type = await resl.data?.user?.type;
                localStorage.setItem("token", token);
                localStorage.setItem("type", type);
                setloader(false);

                await Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: resr.data?.message,
                  showConfirmButton: false,
                  timer: 1500,
                });

                if (resl.data?.user?.type == "student") {
                  navigate("/");
                } else if (resl.data?.user?.type == "admin") {
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
          })
          .catch(async (e) => {
            setloader(false);

            await Swal.fire({
              icon: "error",
              text: e.response?.data?.message,
            });
          });
      } catch (e) {
        setloader(false);
        await Swal.fire({
          icon: "error",
          text: e.response?.data?.message,
        });
      }
    },
  });

  return (
    <Box>
      <Container component="main" sx={{ maxWidth: "600px" }} maxWidth={false}>
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
              sx={{ m: 1, bgcolor: "#1976D2", width: "120px" }}
            />
            {/* <LockOutlinedIcon /> */}

            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
              noValidate
              sx={{ mt: 4 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="userName"
                    label="user name"
                    type="text"
                    id="userName"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.userName && Boolean(formik.errors.userName)
                    }
                    helperText={
                      formik.touched.userName && formik.errors.userName
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    // value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    // value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up {loader ? <Loader color={"white"} size={20} /> : null}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    to={"/login"}
                    style={{ textDecoration: "none", color: "#1976d2" }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
