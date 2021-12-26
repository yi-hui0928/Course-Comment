import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container, List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { CardHeader } from '@material-ui/core'
import { CardContent } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Button } from '@material-ui/core'
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '2px'
  },
  container: {
    marginTop: '30px'
  },
  title: {
    marginTop: '50px'
  },
  send: {
    markerLeft: '10px',
    marginRight: '10px'
  }
}));


export default function Comments() {
  let { id } = useParams();//接參數
  const classes = useStyles();
  const history = useHistory();
  const [currentCourse, setCurrentCourse] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/course/' + id)
    .then(res => res.json())
    .then(data => setCurrentCourse(data))
  }, [id])

  useEffect(() => {
    fetch('http://localhost:8000/comments')
    .then(res => res.json())
    .then(data => setComments(data))
  }, [])

  const handleDelete = async(id) => {
    await fetch('http://localhost:8000/comments/' + id ,{
      method: 'DELETE'
    })

    const newComments = comments.filter(comment => comment.id !== id)
    setComments(newComments)
  }

  return (
    <Container className={classes.container}>

      {/*------------課程詳細介紹------------ */}
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              {currentCourse.teacher}
            </Avatar>
          }
          title={currentCourse.course_name}
          subheader={currentCourse.teacher}
        />
        <CardContent>
        <Typography variant='body2' color='textSecondary'>
            學期: {currentCourse.semester}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
            系所: {currentCourse.department}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
            學分數: {currentCourse.credit}
        </Typography>
        <p>
          <Typography variant='body1' color='textPrimary'>
              課程簡介:<br/>{currentCourse.info}
          </Typography>
        </p>
      </CardContent>
      <Button
        onClick={() => history.push("/createcomment")}
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<KeyboardVoiceIcon/>}
        
      >
        我要評論
      </Button>
      </Card>


      {/*------------留言評論------------ */}

      <Typography variant='body2' color='Primary' className={classes.title}>
        以下是該課程相關之評論
      </Typography>
      <List  className={classes.root}>
        {comments.map(comment => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                {comment.category}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={comment.author} secondary={comment.comment}/>  
            <IconButton>
              <KeyboardArrowRightIcon onClick={()=>{history.push('/CreateMessage')}}/>   
            </IconButton>      
            <ListItemSecondaryAction>
              <IconButton edge="end">                
                <DeleteOutlined onClick={()=>handleDelete(comment.id)}/>
              </IconButton>
             </ListItemSecondaryAction>
          </ListItem>
        ))}
        
      </List>
      
    </Container>
  )
}
