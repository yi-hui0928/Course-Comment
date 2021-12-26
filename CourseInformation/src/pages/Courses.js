import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import CourseCard from '../components/CourseCard'


export default function Courses() {
  const [courses, setCourses] = useState([])
  
  useEffect(()=>{
    fetch('http://localhost:8000/course')
    .then(res => res.json())
    .then(data => setCourses(data))
  }, [])

  return (
    <Container>
      <Grid container spacing={5}>
        {courses.map(course => (
          <Grid item key={course.id} xs={12} md={6} lg={4}>
            <CourseCard course={course}></CourseCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
