import { ArrowBack } from "@mui/icons-material";
import { Avatar, Box, Button, Card, TextField, styled, useMediaQuery } from "@mui/material";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Config/FirebaseStorage/FirebaseStorage";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Edit = () => {
  const VisuallyHiddenInput = styled("input")({
    opacity: "0",
    height: 60,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 55,
  });
  const navigate = useNavigate();
  const [LoaderIMG, setLoaderIMG] = React.useState(false);
  const [loader, setloader] = React.useState(false);

  const [imgurl, setimgurl] = React.useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoaderIMG(true);
      const storageRef = ref(storage, `${file.size}`);
      uploadBytes(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              setimgurl(`${url}`);
              setLoaderIMG(false);
            })
            .catch((err) => {
              setLoaderIMG(false);
              Swal.fire({
                icon: "error",
                title: err.message,
              });
            });
        })
        .catch((err) => {
          setLoaderIMG(false);
          Swal.fire({
            icon: "error",
            title: err.message,
          });
        });
    }
  };
  const [newPass, setnewPass] = useState("");
  const [oldPass, setoldPass] = useState("");

  const [sixEror, setsixEror] = useState(false);
  const [requiredEror, setrequiredEror] = useState(false);
  const [requiredEror2, setrequiredEror2] = useState(false);
  const Uid = localStorage.getItem("userId");
  const { id } = useParams();

  async function EditU() {
    try {
      if (imgurl) {
        setloader(true);
        await axios
          .put(import.meta.env.VITE_API + "users/edit/" + Uid, {
            image: imgurl,
          })
          .then(async (res) => {
            await axios
              .put(import.meta.env.VITE_API + "students/" + id, {
                image: imgurl,
              })
              .then(async (res) => {
                setloader(false);
                await Swal.fire({
                  icon: "success",
                  title: "User Edited Successfully",
                });
                newPass.length >= 6 || oldPass
                  ? null
                  : navigate("/user/profile");
              })
              .catch(async (e) => {
                setloader(false);

                await Swal.fire({
                  icon: "error",
                  title: e?.message,
                });
              });
          })
          .catch(async (e) => {
            setloader(false);
            await Swal.fire({
              icon: "error",
              title: e?.message,
            });
          });
      }

      if (newPass.length >= 6 && oldPass) {
        setsixEror(false);
        setrequiredEror(false);
        setrequiredEror2(false);
        setloader(true);
        await axios
          .put(import.meta.env.VITE_API + "users/edit/password/" + Uid, {
            oldPassword: oldPass,
            newPassword: newPass,
          })
          .then(async (res) => {
            setloader(false);
            await Swal.fire({
              icon: "success",
              title: res.data?.message,
            });
            navigate("/user/profile");
          })
          .catch(async (e) => {
            setloader(false);
            await Swal.fire({
              icon: "error",
              title: e?.response?.data?.message,
            });
          });
      } else {
        if (newPass.length < 6) {
          setsixEror(true);
        } else {
          setsixEror(false);
        }
        if (newPass && !oldPass) {
          setrequiredEror(true);
        } else {
          setrequiredEror(false);
        }
        if (!newPass && oldPass) {
          setrequiredEror2(true);
        } else {
          setrequiredEror2(false);
        }
      }
    } catch (error) {
      setloader(false);
      Swal.fire({
        icon: "error",
        title: e.message,
      });
    }
  }
const size = useMediaQuery('(max-width:500px)')
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "auto",
        p: 5,
        maxWidth: "700px",
        m: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Button
          sx={{ position: "absolute", top: 5, left: -6 }}
          onClick={() => navigate("/user/profile")}
        >
          <ArrowBack />
        </Button>
        <div style={{ fontWeight: "600" }}>Edit Profile</div>

        {!imgurl ? (
          <Box
            style={{
              width: "60px",
              height: "60px",
              background: "#1976D2",
              position: "relative",
              borderRadius: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!LoaderIMG ? (
              <>
                <PersonSharpIcon
                  sx={{
                    position: "absolute",
                    top: "20%",
                    left: "23%",
                    color: "lightgray",
                    fontSize: "35px",
                  }}
                />
                <CloudDownloadRoundedIcon
                  style={{
                    position: "absolute",
                    bottom: "-3%",
                    right: "7%",
                    color: "lightgray",
                    fontSize: "20px",
                  }}
                />
                <VisuallyHiddenInput
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <Loader color={"WHITE"} size={20} />
            )}
          </Box>
        ) : (
          <Avatar
            src={imgurl}
            sx={{
              width: "60px",
              height: "60px",
            }}
          />
        )}
        <div style={{ width: "100%" }}>
          <TextField
            required
            onChange={(e) => {
              setoldPass(e.currentTarget.value);
            }}
            fullWidth
            type="password"
            id="password"
            label="Old Password"
            name="password"
          />
          {requiredEror ? (
            <div style={{ color: "red", marginTop: "2px" }}>
              Old Password is required
            </div>
          ) : null}
        </div>
        <div style={{ width: "100%" }}>
          <TextField
            required
            onChange={(e) => {
              setnewPass(e.currentTarget.value);
            }}
            fullWidth
            type="password"
            id="password2"
            label="New Password"
            name="password2"
          />
          {requiredEror2 ? (
            <div style={{ color: "red", marginTop: "2px" }}>
              New Password is required
            </div>
          ) : null}
          {!requiredEror2 ? (
            sixEror ? (
              <div style={{ color: "red", marginTop: "2px" }}>
                6 letters is required
              </div>
            ) : null
          ) : null}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          fullWidth={size?true:false}
          onClick={() => {
            EditU();
          }}
        >
          save Changes{loader ? <Loader color={"white"} size={20} /> : null}
        </Button>
        <Button
          fullWidth={size?true:false}

          variant="contained"
          onClick={() => {
            navigate("/user/profile");
          }}
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default Edit;
