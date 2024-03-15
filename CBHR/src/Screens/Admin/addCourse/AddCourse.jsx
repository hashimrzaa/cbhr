import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
const AddCourse = () => {
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
      console.log(v);
      formik.resetForm();
    },
  });
  const size = useMediaQuery("(max-width:600px)");

  return (
    <Card sx={{ p: 3, m: "auto", maxWidth: "800px", mt: 5 }}>
      <div style={{ textAlign: "center", fontSize: "40px",fontWeight:'bold' }}>Add Course</div>
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
              autoFocus
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
              Add Course
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default AddCourse;
