import { Avatar, Box, Button, Card, Divider } from "@mui/material";
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
  return (
    <div>
      <Card>
        <div
          style={{
            padding: "1.5rem",
            fontSize: "30px",
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          All Students
        </div>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexDirection: "column",
            p: 4,
          }}
        >
          {data.length > 0 ? (
            data.map((item, index) => {
              return (
                <Card
                  key={index}
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar src={item.name} alt={item.name} />
                    <div
                      style={{ color: "#1976d2" }}
                      onClick={() => {
                        navigate(item._id);
                      }}
                    >
                      {item.name}
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
                </Card>
              );
            })
          ) : loader ? (
            <Loader size={50} />
          ) : (
            <div
              style={{
                fontSize: "20px",
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
