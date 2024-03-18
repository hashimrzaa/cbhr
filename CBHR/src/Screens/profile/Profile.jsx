import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import React from "react";
import {
  Box,
  Avatar,
  Card,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../Components/Loader";
import Swal from "sweetalert2";
import { ArrowBack } from "@mui/icons-material";
import NotFoundPage from "../../Status404";

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(13)};
    font-weight: bold;
    text-transform: uppercase;
    border-radius: ${theme.shape.borderRadius};
    padding: ${theme.spacing(0.9, 1.5, 0.7)};
    line-height: 1;
  `
);

function SingleStudent() {
  const theme = useTheme();
  const id = localStorage.getItem("userId");
  const [UserData, setUserData] = useState({});
  const [StudentData, setStudentData] = useState({});
  const [Loadera, setLoader] = useState(false);
  useEffect(() => {
    async function getStudent() {
      setLoader(true);
      try {
        await axios(import.meta.env.VITE_API + "users/" + id).then(
          async (res) => {
            const data = res.data?.data;
            const name = res.data?.data?.userName;
            await axios(import.meta.env.VITE_API + "students").then(
              async (res) => {
                const student = res.data?.data?.find(
                  (item) => item?.name == name
                );
                setStudentData(student);
                setLoader(false);
              }
            );
            setUserData(data);
          }
        );
      } catch (error) {
        setLoader(false);

        Swal.fire({
          icon: "error",
          title: error.message,
        });
      }
    }
    getStudent();
  }, []);
  const size = useMediaQuery("(max-width:500px)");
  const navigate = useNavigate();

  return (
    <>
      {UserData?.userName && StudentData?.name ? (
        <Card
          variant="outlined"
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: theme.palette.gradients?.pink2,
            p: 3,
            textAlign: "center",
            overflowX: "auto",
            margin: "auto",
            overflow: "auto",
          }}
        >
          <Button
            sx={{ position: "absolute", top: 5, left: -6 }}
            onClick={() => navigate("/")}
          >
            <ArrowBack />
          </Button>
          <div
            style={{
              fontWeight: "600",
              // marginBottom: "30px",
              padding: "20px",
              // background: "#1976d2",
              color: "black",
              width: "100%",
              borderRadius: "10px",
              opacity: "0.7",
              fontSize:'20px'
              // marginTop:'px'
            }}
          >
            Your Profile
          </div>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mb: 1,
              mx: "auto",
              boxShadow: `0 .113rem .5rem ${theme.palette.alpha?.black[10]}, 0 .126rem .225rem ${theme.palette.alpha?.black[30]}`,
              border: `${theme.palette.alpha?.white[100]} solid 3px`,
              fontSize: "40px",
            }}
            src={
              UserData.image ? UserData.image : UserData.userName?.toUpperCase()
            }
            alt={UserData.userName?.toUpperCase()}
          />
          <div
            style={{ fontSize: "16px", marginBottom: "4px", fontWeight: "500" }}
          >
            {UserData.userName?.toUpperCase()}
          </div>
          <Button
            sx={{ mb: 3}}
            onClick={() => {
              navigate(`edit/${StudentData._id}`);
            }}
          >
            <LabelWrapper
              sx={{
                background: "orange",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                
              }}
            >
              Edit Profile
            </LabelWrapper>
          </Button>

     

          <div style={{ width: "90%", marginBottom: "40px" }}>
            <Grid spacing={2} container>
              <Grid
                item
                xs={size ? 12 : 6}
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontWeight: 500 }}>From</span>{" "}
                <div style={{ color: "gray", fontWeight: "400" }}>
                  {StudentData.address}
                </div>
              </Grid>
              <Grid
                item
                xs={size ? 12 : 6}
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontWeight: 500 }}>Gender</span>{" "}
                <div style={{ color: "gray", fontWeight: "400" }}>
                  {StudentData.gender}
                </div>
              </Grid>
              <Grid
                item
                xs={size ? 12 : 6}
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontWeight: 500 }}>Age</span>{" "}
                <div style={{ color: "gray", fontWeight: "400" }}>
                  {StudentData.age}
                </div>
              </Grid>
              <Grid
                item
                xs={size ? 12 : 6}
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontWeight: 500 }}>Email</span>{" "}
                <div style={{ color: "gray", fontWeight: "400" }}>
                  {UserData.email}
                </div>
              </Grid>
            </Grid>
          </div>

          <div
            style={{
              fontWeight: "600",
              marginBottom: "25px",
              padding: "20px",
              background: "#1976d2",
              color: "white",
              width: "100%",
              borderRadius: "5px ",
              opacity: "0.8",
            }}
          >
            ABOUT
          </div>

          <Typography
            variant="subtitle2"
            sx={{
              fontSize: theme.typography.pxToRem(16),
              pt: 3,
              color: "gray",
            }}
          >
            {StudentData.name} Register in {StudentData.courseName} Course in HR
            Organization
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: theme.typography.pxToRem(16),
              pb: 3,
              color: "gray",
            }}
          >
            Hashim Raza management system (HR) is a software application
            designed to streamline the administration and delivery of
            educational courses or training programs
          </Typography>
        </Card>
      ) : Loadera ? (
        <div style={{ position: "absolute", left: "45%", top: "50%" }}>
          <Loader size={50} mt={"50vh"} />
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}

export default SingleStudent;
