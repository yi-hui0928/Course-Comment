import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getToken, url } from "../utils/localStorge";
import axios from "axios";

function LogOutBtn() {
  const History = useHistory();

  const logout = () => {
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
          console.log(response.data);
          localStorage.removeItem("userData");
          History.push("/");
          return;
        })
        .catch((error) => {
          console.log(error.response.data);
          window.alert(error.response.data.message);
        });
    }
  };
  return (
    <Button onClick={logout} variant="contained" color="primary">
      登出
    </Button>
  );
}

export default LogOutBtn;
