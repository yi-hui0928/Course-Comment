export const url = "http://localhost:8000/api/";

export function getToken() {
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
  const data = JSON.parse(localStorage.getItem("userData"));

  const { id } = data;
  console.log(id);
  return id;
}
export function isLogin() {
  if (JSON.parse(localStorage.getItem("userData")) != undefined) {
    return true;
  } else {
    return false;
  }
}
