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
import axios from "axios";

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

export default function Register() {
  const History = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [error, setError] = useState("");
  //註冊事件
  const RegisterEvent = (e) => {
    e.preventDefault();

    axios
      .post(
        url + "register",
        new URLSearchParams({
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        }),
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("userData", JSON.stringify(response.data));
        History.push("/");
        return;
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        if (error.response.status == 422) {
          window.alert(JSON.stringify("資訊驗證錯誤已存在"));
        }
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          註冊
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
            name="name"
            label="姓名"
            type="name"
            id="name"
            autoComplete="current-password"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            label="密碼"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="密碼確認"
            type="password"
            id="password_confirmation"
            autoComplete="current-password"
            onChange={(e) => setPassword_confirmation(e.target.value)}
            value={password_confirmation}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={RegisterEvent}
          >
            註冊
          </Button>
          <Typography>{error}</Typography>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => History.push("/login")}
              >
                {"已經有帳號了嗎?去登入"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
