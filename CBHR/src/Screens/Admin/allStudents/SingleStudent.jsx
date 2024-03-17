import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import React from "react";
import {
  Box,
  Avatar,
  Card,
  Typography,
  IconButton,
  Tooltip,
  alpha,
  styled,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import PersonSearchTwoToneIcon from "@mui/icons-material/PersonSearchTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../../Components/Loader";
import Swal from "sweetalert2";
import { ArrowBack } from "@mui/icons-material";

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

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(1.5)};
    top: ${theme.spacing(1.5)};
    z-index: 7;
  `
);

function Block13() {
  const theme = useTheme();
  const { id } = useParams();
  const [UserData, setUserData] = useState({});
  const [StudentData, setStudentData] = useState({});

  useEffect(() => {
    async function getStudent() {
      try {
        await axios(import.meta.env.VITE_API + "students/" + id).then(
          async (res) => {
            const data = res.data?.data;
            const name = res.data?.data?.name;
            await axios(import.meta.env.VITE_API + "users").then(
              async (res) => {
                const user = res.data?.data?.find(
                  (item) => item?.userName == name
                );
                setUserData(user);
              }
            );
            setStudentData(data);
          }
        );
      } catch (error) {
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
      {UserData.userName && StudentData.name ? (
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
            maxWidth: "900px",
            margin: "auto", 
          }}
        >
          <Button
            sx={{ position: "absolute", top: 5, left: -6 }}
            onClick={() => navigate("/admin/allstudents")}
          >
            <ArrowBack />
          </Button>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mb: 2,
              mx: "auto",
              boxShadow: `0 .113rem .5rem ${theme.palette.alpha?.black[10]}, 0 .126rem .225rem ${theme.palette.alpha?.black[30]}`,
              border: `${theme.palette.alpha?.white[100]} solid 3px`,
              fontSize: "40px",
            }}
            src={UserData.userName}
            alt={UserData.userName}
          />
          <div
            style={{
              fontWeight: "600",
              fontSize: size ? "20px" : "27px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {UserData.userName?.toUpperCase()}
            <Typography
              sx={{
                fontSize: size ? "18px" : "20px",
              }}
            >
              <span
                style={{ fontSize: "16px", fontWeight: "300", color: "gray" }}
              >
                From
              </span>{" "}
              <b style={{ color: "gray" }}>{StudentData.address}</b>
            </Typography>
          </div>

          <Typography
            variant="subtitle2"
            sx={{
              fontSize: theme.typography.pxToRem(16),
              color: "gray",
            }}
          >
            {StudentData.age}{" "}
            <span style={{ fontWeight: "300" }}>years old</span>
          </Typography>

          <Box mt={1}>
            <LabelWrapper
              sx={{
                background: "#1976d2",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Student
            </LabelWrapper>
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: theme.typography.pxToRem(16),
              pt: 3,
              color: theme.palette.alpha?.trueWhite[70],
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
              color: theme.palette.alpha?.trueWhite[70],
            }}
          >
            Hashim Raza management system (HR) is a software application
            designed to streamline the administration and delivery of
            educational courses or training programs
          </Typography>
        </Card>
      ) : (
        <div style={{ position: "absolute", left: "45%", top: "50%" }}>
          <Loader size={50} mt={"50vh"} />
        </div>
      )}
    </>
  );
}

export default Block13;
