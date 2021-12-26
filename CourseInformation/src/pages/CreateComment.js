import React from 'react'
import { Container } from '@material-ui/core'
import { useState } from 'react'
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Typography } from '@material-ui/core';


const useStyle = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
    }
  })


export default function CreateComment() {
    const classes = useStyle()
    const history = useHistory()
    const [rating, setRating] = useState('')
    const [grading, setGrading] = useState('')
    const [assignment, setAssignment] = useState('')
    const [comment, setComment] = useState('')
    const [author, setAuthor] = useState('')
    const [ratingError, setRatingError] = useState('')
    const [gradingError, setGradingError] = useState('')
    const [assignmentError, setAssignmentError] = useState('')
    const [commentError, setCommentError] = useState('')
    const [authorError, setAuthorError] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        setRatingError(false)
        setGradingError(false)
        setAssignmentError(false)
        setCommentError(false)
        setAuthorError(false)
    
        if(rating === ''){
            setRatingError(true)
        }
        
        if(grading === ''){
            setGradingError(true)
        }
        if(assignment === ''){
            setAssignmentError(true)
          }
        
          if(comment === ''){
            setCommentError(true)
          }
        
          if(author === ''){
            setAuthorError(true)
          }
          
    
        if(rating && grading && assignment && comment && author){
          fetch('http://localhost:8000/comments', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ rating, grading, assignment, comment, author })
          }).then(() => history.push('/'))
        }
      }


    return (
        <Container>
            <Typography
                variant='h6'
                color='textSecondary'
                component='h2'
                gutterBottom
            >
                Create a new comment
            </Typography>

            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
                onChange={(e) => setRating(e.target.value)}
                className={classes.field}
                label="Course Rating"
                variant="outlined"
                color='secondary'
                fullWidth
                required
                error={ratingError}
            />
            <TextField
                onChange={(e) => setGrading(e.target.value)}
                className={classes.field}
                label="Course Grading"
                variant="outlined"
                color='secondary'
                fullWidth
                required
                error={gradingError}
            />
            <TextField
                onChange={(e) => setAssignment(e.target.value)}
                className={classes.field}
                label="Course Assigment"
                variant="outlined"
                color='secondary'
                fullWidth
                required
                error={assignmentError}
            />
            <TextField
                onChange={(e) => setComment(e.target.value)}
                className={classes.field}
                label="Course Comment"
                variant="outlined"
                color='secondary'
                multiline
                minRows={4}
                fullWidth
                required
                error={commentError}
            />
            <TextField
                onChange={(e) => setAuthor(e.target.value)}
                className={classes.field}
                label="Author"
                variant="outlined"
                color='secondary'
                fullWidth
                required
                error={authorError}
            />

            <Button
                type='submit'
                color='secondary'
                variant='contained'
                endIcon={<KeyboardArrowRightIcon/>}
            >
                Submit your comment
            </Button>
            </form>
        </Container>
    )
}
