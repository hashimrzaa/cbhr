import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import Loader from "../../../Components/Loader";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import { styled } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../Config/FirebaseStorage/FirebaseStorage";
const VisuallyHiddenInput = styled("input")({
  opacity: "0",
  height: 60,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 55,
});
export default function SignIn() {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [course, setcourse] = useState([]);
  const [isUrl, setisUrl] = useState(false);

  useEffect(() => {
    async function getCourses() {
      try {
        const res = await axios.get(import.meta.env.VITE_API + "courses");
        const data = res.data?.data;
        setcourse(
          data.map((item) => {
            return item.courseName;
          })
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    getCourses();
  }, [navigate]);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    userName: yup.string().required("UserName is required"),
    gender: yup.string().min(1).required("gender is required"),

    address: yup.string().min(3).required("address is required"),
    courseName: yup.string().min(1).required("Course is required"),
    age: yup.number().min(1).required("Age is required"),
    password: yup.string().min(6).required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",

      age: "",
      address: "",
      courseName: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (v) => {
      try {
        setloader(true);
        if (imgurl) {
          setisUrl(false);
        } else {
          setisUrl(true);
          setloader(false);
          return;
        }
        await axios
          .post(import.meta.env.VITE_API + "users/register", {
            userName: v.userName,
            email: v.email,
            password: v.password,
            type: "student",
            image: imgurl ? imgurl : "",
          })
          .then(async (resr) => {
            await axios
              .post(import.meta.env.VITE_API + "students/add", {
                name: v.userName,
                address: v.address,
                gender: v.gender,
                age: +v.age,
                courseName: v.courseName,
                image: imgurl ? imgurl : "",
              })
              .then(async (ress) => {
                await axios
                  .put(import.meta.env.VITE_API + "users/login", {
                    email: v.email,
                    password: v.password,
                  })
                  .then(async (resl) => {
                    const token = await resl.data?.token;
                    const type = await resl.data?.user?.type;
                    const userId = await resl.data?.user?._id;

                    localStorage.setItem("token", token);
                    localStorage.setItem("type", type);
                    localStorage.setItem("userId", userId);
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

  const size = useMediaQuery("(max-width:600px)");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoaderIMG(true);
      const storageRef = ref(storage, `${file.size}`);
      uploadBytes(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              setimgurl(`${url}`);
              setLoaderIMG(false);
              url ? setisUrl(false) : null;
            })
            .catch((err) => {
              setLoaderIMG(false);
              Swal.fire({
                icon: "error",
                title: err.message,
              });
            });
        })
        .catch((err) => {
          setLoaderIMG(false);
          Swal.fire({
            icon: "error",
            title: err.message,
          });
        });
    }
  };
  let [LoaderIMG, setLoaderIMG] = React.useState(false);
  let [imgurl, setimgurl] = React.useState("");
  console.log(imgurl);
  return (
    <Box>
      <Container component="main" sx={{ maxWidth: "600px" }} maxWidth={false}>
        <Card sx={{ p: 4, my: 2 }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!imgurl ? (
              <Box
                style={{
                  width: "60px",
                  height: "60px",
                  background: "#1976D2",
                  position: "relative",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!LoaderIMG ? (
                  <>
                    <PersonSharpIcon
                      sx={{
                        position: "absolute",
                        top: "20%",
                        left: "23%",
                        color: "lightgray",
                        fontSize: "35px",
                      }}
                    />
                    <CloudDownloadRoundedIcon
                      style={{
                        position: "absolute",
                        bottom: "-3%",
                        right: "7%",
                        color: "lightgray",
                        fontSize: "20px",
                      }}
                    />
                    <VisuallyHiddenInput
                      accept="image/*"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </>
                ) : (
                  <Loader color={"WHITE"} size={20} />
                )}
              </Box>
            ) : (
              <Avatar
                src={imgurl}
                sx={{
                  width: "60px",
                  height: "60px",
                }}
              />
            )}
            {isUrl ? (
              <div style={{ color: "red" }}>Image is required</div>
            ) : null}
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
                setisUrl(true);
              }}
              noValidate
              sx={{ mt: 4 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={size ? 12 : 6}>
                  <TextField
                    required
                    fullWidth
                    name="userName"
                    label="User Name"
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
                <Grid item xs={size ? 12 : 6}>
                  <TextField
                    required
                    fullWidth
                    name="age"
                    label="Age"
                    type="number"
                    id="age"
                    onChange={formik.handleChange}
                    error={formik.touched.age && Boolean(formik.errors.age)}
                    helperText={formik.touched.age && formik.errors.age}
                  />
                </Grid>

                <Grid item xs={12}>
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
                    type={showPassword ? "text" : "password"}
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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
                <Grid item xs={size ? 12 : 6}>
                  <Autocomplete
                    disablePortal
                    name="gender"
                    label="Gender"
                    type="text"
                    id="gender"
                    options={["Male", "Female"]}
                    onChange={(e, v) => {
                      formik.values.gender = v;
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        error={
                          formik.touched.gender && Boolean(formik.errors.gender)
                        }
                        helperText={
                          formik.touched.gender && formik.errors.gender
                        }
                        {...params}
                        label="Gender"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={size ? 12 : 6}>
                  <Autocomplete
                    disablePortal
                    name="courseName"
                    label="Course"
                    type="text"
                    id="courseName"
                    options={course}
                    onChange={(e, v) => {
                      formik.values.courseName = v;
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        error={
                          formik.touched.courseName &&
                          Boolean(formik.errors.courseName)
                        }
                        helperText={
                          formik.touched.courseName && formik.errors.courseName
                        }
                        {...params}
                        label="Course"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Address  "
                    type="text"
                    id="address"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
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
