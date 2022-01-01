import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const url = "http://localhost:8000/api/";

export function getToken() {
  if (!isLogin()) {
    return;
  }
  const data = JSON.parse(localStorage.getItem("userData"));
  const { api_token } = data;

  return api_token;
}
export function getName() {
  const data = JSON.parse(localStorage.getItem("userData"));

  const { name } = data;
  console.log(name);
  return name;
}

export function getId() {
  if (!isLogin()) {
    return;
  }
  const data = JSON.parse(localStorage.getItem("userData"));

  const { id } = data;
  return id;
}
export function isLogin() {
  if (JSON.parse(localStorage.getItem("userData"))) {
    return true;
  } else {
    return false;
  }
}
