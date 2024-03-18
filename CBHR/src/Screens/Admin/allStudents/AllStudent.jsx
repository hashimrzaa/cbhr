import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../../../Components/Loader";
import Swal from "sweetalert2";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AllStudent = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [fetch, setfetch] = useState(false);
  const [indexx, setindex] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getStudents = async () => {
      setLoader(true);
      try {
        const res = await axios.get(import.meta.env.VITE_API + "students");
        setData(res.data?.data);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoader(false);
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      } finally {
        setLoader(false);
      }
    };

    getStudents();
    setfetch(false);
  }, [fetch]);

  async function deleteStudent(ids, name) {
    setLoader2(true);
    try {
      await axios
        .delete(import.meta.env.VITE_API + `students/delete/${ids}`)
        .then(async (resa) => {
          const res = await axios(import.meta.env.VITE_API + `users`);
          const user = await res.data?.data.find(
            (item) => item.userName == name
          );
          const id = user._id;
          await axios
            .delete(import.meta.env.VITE_API + `users/delete/${id}`)
            .then(async (res) => {
              setLoader2(false);
              setfetch(true);

              await Swal.fire({
                icon: "success",
                title: res.data?.message,
                showConfirmButton: false,
                timer: 1500,
              });
            });
        })
        .catch(async (e) => {
          setLoader2(false);

          await Swal.fire({
            icon: "error",
            text: e.response?.data?.message,
          });
        });
    } catch (e) {
      setLoader2(false);

      await Swal.fire({
        icon: "error",
        text: e.message,
      });
    }
  }
  const size = useMediaQuery("(max-width:500px)");
  return (
    <div>
      <Card sx={{ overflow: "auto" }}>
        <div
          style={{
            padding: "1.5rem",
            fontSize: size ? "25px" : "35px",
            fontWeight: "500",
            color: size ? "#1976d2" : "WHITE",
            textAlign: "center",
            background: size ? "" : "#1976d2",
            letterSpacing: "1.5px",
            overflow: "auto",
          }}
        >
          ALL STUDENTS
        </div>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {data.length > 0 ? (
            data.map((item, index) => {
              return (
                <div key={index}>
                  <Box
                    sx={{
                      p: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: !size ? "row" : "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        cursor: "pointer",
                        flexDirection: !size ? "row" : "column",
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
                        onClick={() => {
                          navigate(item._id);
                        }}
                      >
                        {item.name}
                        {!size ? (
                          <span style={{ fontWeight: "350", fontSize: "18px" }}>
                            {" "}
                            <span style={{fontSize:'14px',fontWeight:'400'}}>From</span>{" "}
                            <b
                              style={{
                                color: "gray",
                                fontSize: "15px",
                                fontWeight: "500",
                              }}
                            >
                              {item.address?.toUpperCase()}
                            </b>
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setindex(index);
                        deleteStudent(item._id, item.name);
                      }}
                    >
                      {loader2 && indexx == index ? (
                        <Loader size={20} />
                      ) : (
                        <Delete />
                      )}
                    </Button>
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
                fontSize: "20px",
                padding: 30,
                textAlign: "center",
              }}
            >
              No Students Are Available Now
            </div>
          )}
        </Box>
      </Card>
    </div>
  );
};

export default AllStudent;
