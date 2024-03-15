import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Avatar,
  Divider,
  useTheme,
} from "@mui/material";
import SubscriptionsTwoToneIcon from "@mui/icons-material/SubscriptionsTwoTone";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import AssessmentTwoToneIcon from "@mui/icons-material/AssessmentTwoTone";
import styled from "@mui/system/styled";
import { SchoolRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../Components/Loader";
import { useNavigate } from "react-router-dom";

const AvatarError = styled(Avatar)(
  ({ theme }) => `
        background-color:#1976D2;
        width: ${theme.spacing(9)};
        height: ${theme.spacing(9)};
        box-shadow: ${theme.shadows?.error};
        top: -${theme.spacing(4.5)};
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
  `
);

function AllCourses() {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getCourses() {
      setloader(true);
      try {
        const res = await axios.get(import.meta.env.VITE_API + "courses");
        setData(res.data?.data);
        setloader(false);
      } catch (error) {
        console.error(error);
      }
    }
    getCourses();
  }, []);

  return (
    <Grid container spacing={5}>
      {data.length > 0 ? (
        data.map((item, index) => {
          return (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  overflow: "visible",
                  position: "relative",
                  pt: 4.5,
                  pb: 2,
                  mt: 4.5,
                }}
              >
                <AvatarError variant="rounded">
                  <SchoolRounded fontSize="large" />
                </AvatarError>
                <Box px={3.5} pt={3.5}>
                  <Typography
                    textAlign="center"
                    variant="h1"
                    sx={{
                      mb: 1,
                      fontSize: "35px",
                      fontWeight: "400",
                    }}
                  >
                    {item?.courseName}
                  </Typography>
                  <Typography
                    textAlign="center"
                    variant="subtitle2"
                    sx={{
                      mb: 3,
                      fontSize: theme.typography.pxToRem(17),
                    }}
                  >
                    Course By {item?.sirName}
                  </Typography>
                  <Divider
                    sx={{
                      mb: 2,
                    }}
                  />
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Button
                      sx={{
                        textTransform: "uppercase",
                        fontSize: "15px",
                      }}
                      variant="text"
                      style={{ color: "#1976d2" }}
                      onClick={()=>{
                        navigate(item._id)
                      }}
                    >
                      View details
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })
      ) : loader ? (
        <div style={{ position: "absolute", left: "45%", top: "50%" }}>
          <Loader size={50} mt={"50vh"} />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: "36%",
            top: "50%",
            fontSize: "27px",
          }}
        >
          No Course Are Availables Now
        </div>
      )}
    </Grid>
  );
}

export default AllCourses;
