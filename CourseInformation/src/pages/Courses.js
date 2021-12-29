import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import CourseCard from "../components/CourseCard";
import { url } from "../utils/localStorge";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(url + "courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        const data = response.data;
        console.log(data);
        setCourses(data);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={5}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} md={6} lg={4}>
            <CourseCard course={course}></CourseCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
