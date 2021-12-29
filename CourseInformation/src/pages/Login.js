import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { url } from "../utils/localStorge";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const History = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //登入事件
  const LogInEvent = (e) => {
    e.preventDefault();

    //打api
    fetch(url + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      //設定參數
      body: new URLSearchParams({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        localStorage.setItem("userData", JSON.stringify(response.data));
        History.push("/");
        return;
      })
      .catch((error) => {
        console.log(error);
        History.push("/404");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          登入
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="電子郵件"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="密碼"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={LogInEvent}
          >
            登入
          </Button>

          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => History.push("/register")}
              >
                {"沒有帳號?去註冊"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
