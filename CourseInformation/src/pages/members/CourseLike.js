import { Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { getToken, url } from "../../utils/localStorge";

function CourseLike() {
  const [isLoading, setIsLoading] = useState(true);

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(url + "user/likes", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        const data = response.data.data;
        console.log(data);
        setCourses(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
  return (
    <Container>
      {isLoading ? (
        <h1>載入中...</h1>
      ) : (
        <Grid container spacing={5}>
          {courses.length === 0 ? (
            <Typography variant="h5">目前沒有喜歡的課程喔</Typography>
          ) : (
            courses.map((course) => (
              <Grid item key={course.id} xs={12} md={6} lg={4}>
                <CourseCard course={course}></CourseCard>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
}

export default CourseLike;
