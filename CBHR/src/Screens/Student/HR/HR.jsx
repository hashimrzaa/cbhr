import { Box, Button, Card, styled, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

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
const HR = () => {
  const navigate = useNavigate();
  const size = useMediaQuery("(max-width:600px)");
  return (
    <Card sx={{ p: 5, overflow: "auto", mt: 6 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: size ? "25px" : "35px",
            fontWeight: "400",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Welcome to
          <span style={{ color: "#1976d2", fontWeight: "600" }}> HR</span>{" "}
          Organizaion
        </div>

        <div
          style={{
            textAlign: "center",
            color: "gray",
            fontSize: "15px",
            maxWidth: "900px",
          }}
        >
          Hashim Raza management system (HR) is a software application designed
          to streamline the administration and delivery of educational courses
          or training programs HR simplifies course scheduling, enrollment
          management, and performance tracking. With user-friendly interfaces
          and robust features, it's the ideal tool for educational institutions
          seeking seamless administration
        </div>
        <div
          style={{
            textAlign: "center",
            color: "gray",
            fontSize: "15px",
            maxWidth: "900px",
          }}
        >
          This Organization is a software application designed to streamline the
          administration and delivery of educational courses or training
          programs
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            sx={{ mt: 3 }}
            onClick={() => {
              navigate("/course");
            }}
          >
            <LabelWrapper
              sx={{
                background: "#1976d2",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                p: "13px",
              }}
            >
              Get Started
            </LabelWrapper>
          </Button>
          <Button
            sx={{ mt: 3 }}
            onClick={() => {
              navigate("/user/profile");
            }}
          >
            <LabelWrapper
              sx={{
                borderRadius: "5px",
                cursor: "pointer",
                p: "13px",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Your Profile
            </LabelWrapper>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HR;
