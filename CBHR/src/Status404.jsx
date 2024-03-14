import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Container, Card } from "@mui/material";
import NotFoundImage from './assests/404.svg'
const NotFoundPage = () => {
  return (
    <Card sx={{p:10,maxWidth:'500px',margin:'auto',marginTop: "2rem"}}>
      <Container
        component="main"
        maxWidth="xs"
        style={{  textAlign: "center" }}
      >
        <img src={NotFoundImage} alt="404" width={'90%'}/>
        <Typography variant="h4" style={{ marginBottom: "2rem" }}>
          Oops! Page not found.
        </Typography>
        <Typography variant="subtitle1" style={{ marginBottom: "2rem" }}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Home
        </Button>
      </Container>
    </Card>
  );
};

export default NotFoundPage;
