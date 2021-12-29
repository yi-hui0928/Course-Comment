import React from "react";
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
import { Avatar } from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import { getName, getToken, isLogin } from "../utils/localStorge";

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

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  let name = "";
  if (isLogin()) {
    name = getName();
  }
  const menuItems = [
    {
      text: "課程評論",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "會員管理",
      icon: <AddCircleOutlined color="secondary" />,
      path: "/member",
    },
  ];

  return (
    <div className={classes.root}>
      {/*------------------app bar-----------------*/}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography color="#f9f9f9" className={classes.header}>
            選課資訊交流平台(◍•ᴗ•◍)
          </Typography>

          {name !== "" ? (
            <Typography className={classes.userTitle}>{name}，您好</Typography>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              className={classes.userTitle}
              onClick={() => history.push("/login")}
            >
              點我登入
            </Button>
          )}
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
        </div>

        {/*---------------list / links--------------- */}
        <List>
          {menuItems.map((item) => (
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
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
