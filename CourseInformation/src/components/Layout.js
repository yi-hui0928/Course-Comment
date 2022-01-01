import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import {
  AddCircleOutlined,
  ExitToApp,
  SubjectOutlined,
} from "@material-ui/icons";
import { getName, getToken, isLogin, url } from "../utils/localStorge";
import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      backgroundColor: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      backgroundColor: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(5),
    },
    userTitle: {
      marginLeft: theme.spacing(40),
    },
    header: {
      marginLeft: theme.spacing(40),
    },
  };
});
const LoginMenuItems = [
  {
    text: "課程評論",
    icon: <SubjectOutlined color="secondary" />,
    path: "/",
  },
  {
    text: "看我發過的評論",
    icon: <AddCircleOutlined color="secondary" />,
    path: "/userpost",
  },
  {
    text: "喜歡的課程",
    icon: <FavoriteIcon color="secondary" />,
    path: "/courselike",
  },
  {
    text: "登出",
    icon: <ExitToApp color="secondary" />,
    path: "/logout",
  },
];

const LogoutMenuItems = [
  {
    text: "課程評論",
    icon: <SubjectOutlined color="secondary" />,
    path: "/",
  },
  {
    text: "註冊",
    icon: <AddCircleOutlined color="secondary" />,
    path: "/register",
  },
  {
    text: "登入",
    icon: <AddCircleOutlined color="secondary" />,
    path: "/login",
  },
];

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  let name = "";
  if (isLogin()) {
    name = getName();
  }
  function logout() {
    let result = window.confirm("確定登出?");

    if (result) {
      //打api
      axios
        .post(
          url + "logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          localStorage.removeItem("userData");
          history.push("/");
          return;
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }
  }

  return (
    <div className={classes.root}>
      {/*------------------app bar-----------------*/}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.header}>
            選課資訊交流平台(◍•ᴗ•◍)
          </Typography>
        </Toolbar>
      </AppBar>

      {/*------------------side drawer---------------*/}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography
            variant="h5"
            className={classes.title}
            onClick={() => history.push("/")}
          >
            選課資訊交流平台(◍•ᴗ•◍)
          </Typography>
          {name !== "" ? (
            <Typography variant="h5" className={classes.title}>
              {name}，您好
            </Typography>
          ) : (
            <div></div>
          )}
        </div>

        {/*---------------list / links--------------- */}
        <List>
          {isLogin() ? (
            <div>
              {LoginMenuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => {
                    item.path === "/logout"
                      ? logout()
                      : history.push(item.path);
                  }}
                  className={
                    location.pathname === item.path ? classes.active : null
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </div>
          ) : (
            <div>
              {LogoutMenuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => history.push(item.path)}
                  className={
                    location.pathname === item.path ? classes.active : null
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </div>
          )}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
