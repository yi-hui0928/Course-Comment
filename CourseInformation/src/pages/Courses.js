import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import CourseCard from "../components/CourseCard";
import { isLogin, url } from "../utils/localStorge";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  useEffect(() => {
    axios
      .get(
        url + "courses",
        { params: { page } },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data.data;
        const last_page = response.data.last_page;
        console.log(data);
        setPageCount(last_page);
        setCourses(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data.message);
      });
  }, [page]);

  const handleSearch = () => {};

  return (
    <Container>
      {/* ---------------查詢區域 -------------------*/}
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="search"
        label="想查詢什麼課程"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {/*-------------- 課程內容區域 ------------------*/}
      {isLoading ? (
        <h1>{error ? error : "載入中..."}</h1>
      ) : (
        <Grid container spacing={5}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} md={6} lg={4}>
              <CourseCard course={course}></CourseCard>
            </Grid>
          ))}
        </Grid>
      )}
      {/*-------------- 分頁 ------------------*/}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item sm={5}>
          <Pagination
            count={pageCount}
            onChange={(e) => {
              console.log(e.target.textContent);
              setPage(e.target.textContent);
              setIsLoading(true);
              window.scroll(0, 0);
            }}
            color="primary"
          ></Pagination>
        </Grid>
      </Grid>
    </Container>
  );
}
