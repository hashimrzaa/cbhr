import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ArrowBack, SchoolRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Loader";
import Swal from "sweetalert2";

const Course = () => {
  const [students, setStudentData] = useState([]);
  const [data, setCourseData] = useState({});
  const [name, setname] = useState("");
  const Uid = localStorage.getItem("userId");
  useEffect(() => {
    async function getData() {
      setloader(true);
      setloader2(true);
      await axios(import.meta.env.VITE_API + "users/" + Uid)
        .then(async (res) => {
          const name = res.data?.data?.userName;
          setname(name);
          await axios(import.meta.env.VITE_API + "students").then(
            async (res) => {
              const find = res.data?.data?.find((item) => item.name == name);
              const courseName = find.courseName;
              axios(import.meta.env.VITE_API + "courses")
                .then(async (resc) => {
                  const find = resc.data?.data?.find(
                    (item) => item.courseName == courseName
                  );
                  await axios(import.meta.env.VITE_API + "students").then(
                    (res) => {
                      const find = res.data?.data?.filter(
                        (item) => item.courseName == courseName
                      );
                      setStudentData(find);
                      setloader(false);
                      setloader2(false);
                    }
                  );
                  setCourseData(find);
                })
                .catch((e) => {
                  console.log(e);
                  setloader(false);
                  setloader2(false);
                });
            }
          );
        })
        .catch(async (e) => {
          setloader(false);
          setloader2(false);
          await Swal.fire({
            icon: "error",
            title: e.message,
          });
        });
    }
    getData();
  }, []);
  const { id } = useParams();
  const size = useMediaQuery("(max-width:600px)");
  const [loader, setloader] = useState(false);
  const [loader2, setloader2] = useState(false);
  return (
    <div>
      <Card sx={{ position: "relative", overflow: "auto" }}>
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
              overflow: "auto",
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
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {students.length > 0 ? (
            students.map((item, index) => {
              return (
                <div key={index}>
                  <Box
                    sx={{
                      p: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      justifyContent: size ? "center" : "",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        cursor: "pointer",
                        flexDirection: size ? "column" : "row",
                      }}
                    >
                      <Avatar
                         src={item.image ? item.image : item.name?.toUpperCase()}
                         alt={item.name?.toUpperCase()}
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
                            {item.name == name ? "" :  <span style={{fontSize:'14px',fontWeight:'400'}}>From</span>}{" "}
                            <b
                              style={{
                                color: "gray",
                                fontSize: "15px",
                                fontWeight: "500",
                              }}
                            >
                              {item.name == name
                                ? "You"
                                : item.address?.toUpperCase()}
                            </b>
                          </span>
                        ) : item.name == name ? (
                          <div style={{color:'gray',textAlign:'center'}}>You</div>
                         
                        ) : null}
                      </div>
                    </div>
                  </Box>
                  <Divider />
                </div>
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
    </div>
  );
};

export default Course;
