import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  List,
  ListItem,
  IconButton,
  Typography,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { Card } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { url, getId, getToken } from "../utils/localStorge";
import { Divider } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import CommentUpdate from "../components/CommentUpdate";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: "2px",
  },
  container: {
    marginTop: "30px",
  },
  title: {
    marginTop: "50px",
  },
  send: {
    markerLeft: "10px",
    marginRight: "10px",
  },
}));

export default function Comments() {
  const { id } = useParams(); //接參數
  const classes = useStyles();
  const history = useHistory();
  const [currentCourse, setCurrentCourse] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getComments() {
    // Http://localhost:8000/api/course/2/comments/
    axios
      .get(url + "course/" + id + "/comments/", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setCurrentCourse(data.course);
        setComments(data.comments);
        setIsLoading(false);
        return;
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  useEffect(() => {
    getComments();
  }, [id]);

  //TODO: delete 和 update 和create
  const handleDelete = (id) => {
    let result = window.confirm("確定刪除?");

    if (result) {
      axios
        .delete(url + "comments/" + id, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response);
          window.alert(error.response.data.message);
        });

      const newComments = comments.filter((comment) => comment.id !== id);
      setComments(newComments);
    }
  };

  if (isLoading) {
    return <h1>載入中...</h1>;
  }
  return (
    <Container className={classes.container}>
      {/*------------課程詳細介紹------------ */}
      <Card>
        <CardHeader
          avatar={<Avatar>{currentCourse.teacher}</Avatar>}
          title={currentCourse.course_name}
          subheader={currentCourse.teacher}
        />
        <CardContent>
          <Typography variant="body2">
            學期: {currentCourse.semester}
          </Typography>
          <Typography variant="body2">
            系所: {currentCourse.department}
          </Typography>
          <Typography variant="body2">
            學分數: {currentCourse.credit}
          </Typography>
          <p>
            <Typography variant="body1">
              課程簡介:
              <br />
              {currentCourse.info}
            </Typography>
          </p>
        </CardContent>
        <Button
          onClick={() => history.push("/createcomment/" + id)}
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<KeyboardVoiceIcon />}
        >
          我要評論
        </Button>
      </Card>

      {/*------------留言評論------------ */}

      <Typography variant="body2" color="Primary" className={classes.title}>
        以下是該課程相關之評論
      </Typography>
      <List className={classes.root}>
        {comments.map((comment) => (
          <div key={comment.id}>
            <ListItem>
              <Container>
                <Card>
                  {comment.authorId === getId() ? (
                    <CardHeader
                      action={
                        <div>
                          <CommentUpdate
                            comment={comment}
                            getComments={getComments}
                          ></CommentUpdate>
                          <IconButton onClick={() => handleDelete(comment.id)}>
                            <DeleteOutline />
                          </IconButton>
                          <Button
                            onClick={() => {
                              history.push("/Messages/" + comment.id);
                            }}
                            endIcon={<KeyboardArrowRightIcon />}
                          >
                            看留言
                          </Button>
                        </div>
                      }
                      title={"來自 " + comment.author + " 同學的評論"}
                    />
                  ) : (
                    <CardHeader
                      action={
                        <IconButton>
                          <KeyboardArrowRightIcon
                            onClick={() => {
                              history.push("/Messages/" + comment.id);
                            }}
                          />
                        </IconButton>
                      }
                      title={"來自 " + comment.author + " 同學的評論"}
                    />
                  )}
                  <CardContent>
                    <Rating value={comment.rating} readOnly />
                    <p>
                      <Typography variant="body1" color="Primary">
                        教學方式 : {comment.teaching}
                      </Typography>
                    </p>
                    <p>
                      <Typography variant="body1" color="Primary">
                        作業方式: {comment.assignment}
                      </Typography>
                    </p>
                    <p>
                      <Typography variant="body1" color="Primary">
                        評分方式: {comment.grading}
                      </Typography>
                    </p>

                    <Typography variant="body1" color="Primary">
                      其他補充:
                      {comment.comment}
                    </Typography>
                  </CardContent>
                </Card>
              </Container>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </Container>
  );
}
