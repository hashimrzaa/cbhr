import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import Loader from "../../../Components/Loader";
import "./index.css";
import "sweetalert2/dist/sweetalert2.css";

const AddCourse = () => {
  const [loader, setloader] = useState(false);

  const validationSchema = yup.object({
    sirName: yup.string().min(3).required("Sir Name is required"),
    courseName: yup.string().min(3).required("courseName is required"),
    days: yup.string().required("day is required"),
  });
  const formik = useFormik({
    initialValues: {
      sirName: "",
      courseName: "",
      days: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (v) => {
      setloader(true);
      try {
        await axios
          .post(import.meta.env.VITE_API + "courses/add", v)
          .then(async (res) => {
            setloader(false);
            await Swal.fire({
              icon: "success",
              title: res.data?.message,
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(async (e) => {
            setloader(false);
            await Swal.fire({
              icon: "error",
              text: e.message,
              customClass: {
                container: "custom-swal-container",
                popup: "custom-swal-popup",
                content: "custom-swal-content",
              },
            });
          });
      } catch (error) {
        setloader(false);
        await Swal.fire({
          icon: "error",
          text: error.message,
          customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
            content: "custom-swal-content",
          },
        });
      }
      formik.resetForm();
    },
  });
  const size = useMediaQuery("(max-width:650px)");

  return (
    <Card sx={{ m: "auto", maxWidth: "700px", mt: 5 }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bold",
          color: "gray",
          paddingTop: 30,
          padding:10,
          paddingBottom: 0,
        }}
      >
        ADD COURSE
      </div>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        noValidate
        sx={{ p: 3, mt: 4, pt: 0 }}
      >
        <Grid container spacing={5}>
          <Grid item xs={size ? 12 : 6}>
            <TextField
              required
              value={formik.values.sirName}
              fullWidth
              id="sirName"
              label="Sir Name"
              name="sirName"
              type="sirName"
              autoComplete="sirName"
              autoFocus
              onChange={formik.handleChange}
              error={formik.touched.sirName && Boolean(formik.errors.sirName)}
              helperText={formik.touched.sirName && formik.errors.sirName}
            />
          </Grid>
          <Grid item xs={size ? 12 : 6}>
            <Autocomplete
              disablePortal
              name="days"
              label="Day"
              type="text"
              id="days"
              options={["MWF", "TTS"]}
              onChange={(e, v) => {
                formik.setFieldValue("days", v);
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  error={formik.touched.days && Boolean(formik.errors.days)}
                  helperText={formik.touched.days && formik.errors.days}
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
              value={formik.values.courseName}
              id="courseName"
              label="Course Name"
              name="courseName"
              type="courseName"
              autoComplete="courseName"
              onChange={formik.handleChange}
              error={
                formik.touched.courseName && Boolean(formik.errors.courseName)
              }
              helperText={formik.touched.courseName && formik.errors.courseName}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Add Course{loader ? <Loader color={"white"} size={20} /> : null}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default AddCourse;
