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
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Rating } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

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

export default function Messages() {
    let { id } = useParams();//接參數
    const classes = useStyles();
    const history = useHistory();
    const [currentComment, setCurrentComment] = useState([])
    const [messages, setMessages] = useState([])
    const [replyMessage, setReplyMessage] = useState('')
    const [createTime, setCreateTime] = useState('')
    const [author, setAuthor] = useState('')
    const [replyMessageError, setReplyMessageError] = useState('')
    const [createTimeError, setCreateTimeError] = useState('')
    const [authorError, setAuthorError] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      setReplyMessageError(false)
      setCreateTimeError(false)
      setAuthorError(false)
  
      if(replyMessage === ''){
        setReplyMessageError(true)
      }
      
      if(createTime === ''){
          setCreateTimeError(true)
      }
  
      if(author === ''){
        setAuthorError(true)
      }
        
  
      if(replyMessage && createTime && author){
        fetch('http://localhost:8000/messages', {
          method: 'POST',
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({ replyMessage, createTime, author })
        }).then(() => history.push('/'))
      }
    }

    useEffect(() => {
        fetch('http://localhost:8000/comments/' + id)
        .then(res => res.json())
        .then(data => setCurrentComment(data))
      }, [id])
    
      useEffect(() => {
        fetch('http://localhost:8000/messages')
        .then(res => res.json())
        .then(data => {
          setMessages(data)
          console.log(data)
        })
      }, [])
    
      const handleDelete = async(id) => {
        await fetch('http://localhost:8000/messages/' + id ,{
          method: 'DELETE'
        })
    
        const newMessages = messages.filter(message => message.id !== id)
        setMessages(newMessages)
      }


    return (
        <Container className={classes.container}>

      {/*------------Comment詳細介紹------------ */}
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              {currentComment.author}
            </Avatar>
          }
          
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary'>
              <p>Assignment : {currentComment.assignment}</p>
          </Typography>
          <Typography variant='body2' color='textSecondary'>
              <p>Grading: {currentComment.grading}</p>
          </Typography>
          <p>
            <Typography variant='body1' color='textPrimary'>
                Comment:<br/>{currentComment.comment}
            </Typography>
          </p>
        </CardContent>
        {/*星星不知道為什麼沒有顯示*/}
        <Rating name="half-rating-read" defaultValue={currentComment.rating} readOnly /> 
      </Card>


      {/*------------留言評論------------ */}

      <Typography variant='body2' color='Primary' className={classes.title}>
        以下是該評論相關之留言
      </Typography>
      <List  className={classes.root}>
        {messages.map(message => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                {message.author}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={message.author} secondary={message.message}/>       
            <ListItemSecondaryAction>
              <IconButton edge="end">                
                <DeleteOutlined onClick={()=>handleDelete(message.id)}/>
              </IconButton>
             </ListItemSecondaryAction>
          </ListItem>
        ))}
        
      </List>
      
      {/*------------------------------這裡開始 Create Message---------------------*/}
      <Typography
                variant='h6'
                color='textSecondary'
                component='h2'
                gutterBottom
            >
                Create a new Message
            </Typography>

            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
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
            <TextField
                onChange={(e) => setCreateTime(e.target.value)}
                className={classes.field}
                label="Create Time"
                variant="outlined"
                color='secondary'
                fullWidth
                required
                error={createTimeError}
            />
            <TextField
                onChange={(e) => setReplyMessage(e.target.value)}
                className={classes.field}
                label="Message"
                variant="outlined"
                color='secondary'
                multiline
                minRows={4}
                fullWidth
                required
                error={replyMessageError}
            />

            <Button
                type='submit'
                color='textSecondary'
                variant='contained'
                endIcon={<KeyboardArrowRightIcon/>}
            >
                Submit your Message
            </Button>
            </form>
    </Container>
    
    
    )
}
