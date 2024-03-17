import { ArrowBack, SchoolRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader";

const SingleCourse = () => {
  const { id } = useParams();
  const [data, setdata] = useState({});
  const [students, setstudents] = useState([]);
  const [loader, setloader] = useState(false);
  const [loader2, setloader2] = useState(false);
  useEffect(() => {
    const getSingleCourse = async () => {
      try {
        setloader(true);
        setloader2(true);
        await axios(import.meta.env.VITE_API + "courses/" + id)
          .then(async (resc) => {
            await axios(import.meta.env.VITE_API + "students").then(
              async (res) => {
                const students = res.data?.data?.filter(
                  (item, index) =>
                    item.courseName == resc.data?.data?.courseName
                );
                setstudents(students);
                setloader2(false);
                setloader(false);
              }
            );
            setdata(resc.data?.data);
          })
          .catch((e) => {
            setloader2(false);
            setloader(false);
            console.log(e);
          });
      } catch (error) {
        setloader2(false);
        setloader(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      }
    };

    getSingleCourse();
  }, []);
  const size = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{ position: "relative", overflow: "auto" }}>
          <Button
            sx={{ position: "absolute", top: 5, left: -6 }}
            onClick={() => navigate("/admin/allcourses")}
          >
            <ArrowBack />
          </Button>
        <Box> 
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 30,
              width: "100%",
              justifyContent: "center",
              gap: 50,
              flexWrap: "wrap",
            }}
          >
            <SchoolRounded sx={{ fontSize: 150 }} />
            {data.courseName ? (
              <div>
                <div
                  style={{
                    fontSize: "2em",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {data.courseName}
                </div>
                <div
                  style={{
                    fontSize: "1.4em",
                    textAlign: "center",
                    fontWeight: "300",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <span>
                    Course By<b style={{ color: "gray" }}> {data.sirName}</b>
                  </span>
                </div>
              </div>
            ) : loader2 ? (
              <Loader color={"black"} />
            ) : null}
          </div>
        </Box>
        <Divider />
        <Box
          key={"amksek"}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {students.length > 0 ? (
            students.map((item, index) => {
              return (
                <>
                  <Box
                    key={item._id}
                    sx={{
                      p: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        cursor: "pointer",
                      }}
                    >
                      <Avatar
                        src={item.name}
                        alt={item.name}
                        sx={{ width: "55px", height: "55px" }}
                      />
                      <div
                        style={{
                          color: "#1976d2",
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        {item.name}
                        {!size ? (
                          <span style={{ fontWeight: "350", fontSize: "18px" }}>
                            {" "}
                            From{" "}
                            <b
                              style={{
                                color: "gray",
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                            >
                              {item.address?.toUpperCase()}
                            </b>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </Box>
                  <Divider />
                </>
              );
            })
          ) : loader ? (
            <div style={{ padding: 30 }}>
              <Loader size={50} />
            </div>
          ) : (
            <div
              style={{
                fontSize: "23px",
                padding: 30,
                textAlign: "center",
              }}
            >
              No Students Are Available Now in this Course
            </div>
          )}
        </Box>
      </Card>
    </>
  );
};

export default SingleCourse;
