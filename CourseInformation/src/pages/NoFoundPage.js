import { Button, Card, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      backgroundColor: "#58B2DC",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    toolbar: theme.mixins.toolbar,
  };
});
function NoFoundPage() {
  const classes = useStyle();
  return (
    <div justify="contant" className={classes.container}>
      <Card>
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">你找的頁面不存在</Typography>
        <Link to="/">
          <Button variant="outlined">回到首頁</Button>
        </Link>
        <Link to="/signin">
          <Button variant="outlined">去登入、註冊</Button>
        </Link>
      </Card>
    </div>
  );
}

export default NoFoundPage;
