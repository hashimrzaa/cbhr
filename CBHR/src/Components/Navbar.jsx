import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import Loader from "./Loader";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "sweetalert2/dist/sweetalert2.css";
import "./index.css";
import { useEffect } from "react";
import axios from "axios";
import UserContexta from "../context/userContextProvider";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
let settings = [];
export default function Navbar() {
  const { setisImageChange, isImageChange } = UserContexta();

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  function Logout() {
    setloader(true);
    fetch(import.meta.env.VITE_API + "users/logout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(async (res) => {
        setloader(false);
        await Swal.fire({
          // position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
            content: "custom-swal-content",
          },
        });
        localStorage.clear();
        navigate("/login");
      })
      .catch(async (e) => {
        setloader(false);
        await Swal.fire({
          icon: "error",
          text: e.message,
          customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
            content: "custom-swal-content",
          },
        });
      });
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  let Items = [];
  const type = localStorage.getItem("type");
  if (type == "student") {
    Items = ["HR", "Course"];
    settings = ["Profile", "Logout"];
  } else {
    Items = ["Add Course", "All Students", "All Courses"];
    settings = ["Logout"];
  }
  const [userData, setuserData] = useState({});
  const id = localStorage.getItem("userId");
  useEffect(() => {
    async function getUser() {
      await axios(import.meta.env.VITE_API + "users/" + id)
        .then((res) => {
          setuserData(res.data?.data);
          setisImageChange(false)
        })
        .catch((e) => {
          console.log(e);
        });
        setisImageChange(false)
    }
    getUser();
  }, [isImageChange,type]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {loader ? (
        <div
          style={{
            position: "absolute",
            left: "47%",
            top: "50%",
            zIndex: "10000",
          }}
        >
          <Loader size={50} mt={"50vh"} />
        </div>
      ) : null}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              {type == "student" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon key={"a"} /> HR
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <AdminPanelSettingsIcon key={"b"} /> HR
                </div>
              )}
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userData.userName?.toUpperCase()}
                    src={
                      userData.image
                        ? userData.image
                        : userData.userName?.toUpperCase()
                    }
                    sx={{ bgcolor: "lightgray" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting == "Logout") {
                        Logout();
                      } else if (setting == "Profile") {
                        navigate("user/profile");
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            {type == "student"
              ? [<PersonIcon key={"a"} />, "Student Portal"]
              : [<AdminPanelSettingsIcon key={"b"} />, "Admin Portal"]}
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Items.map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                switch (text) {
                  case "Course":
                    navigate("course");
                    break;
                  case "All Courses":
                    navigate("allcourses");
                    break;
                  case "All Students":
                    navigate("allstudents");
                    break;
                  case "Add Course":
                    navigate("");
                    break;
                  case "HR":
                    navigate("");
                    break;
                }
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {type == "student" ? (
                    index == 0 ? (
                      <LocalFireDepartmentIcon />
                    ) : (
                      <SchoolIcon />
                    )
                  ) : index == 0 ? (
                    <LibraryAddIcon />
                  ) : index == 1 ? (
                    <PeopleAltIcon />
                  ) : (
                    <SchoolIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "gray",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
