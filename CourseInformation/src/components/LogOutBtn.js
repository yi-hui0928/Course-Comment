import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getToken, url } from "../utils/localStorge";

function LogOutBtn() {
  const History = useHistory();

  const logout = () => {
    let result = window.confirm("確定登出?");

    if (result) {
      //打api
      fetch(url + "logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          localStorage.removeItem("userData");
          History.push("/");
          return;
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
