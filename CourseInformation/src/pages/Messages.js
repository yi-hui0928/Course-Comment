import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { DeleteOutline, DeleteOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Rating } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { getId, getToken, isLogin, url } from "../utils/localStorge";

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

export default function Messages() {
  let { id } = useParams(); //接參數
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();
  const history = useHistory();
  const [currentComment, setCurrentComment] = useState([]);
  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyMessageError, setReplyMessageError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setReplyMessageError(false);

    if (replyMessage === "") {
      setReplyMessageError(true);
    }

    if (replyMessage) {
      axios
        .post(
          url + "messages",
          new URLSearchParams({
            message: replyMessage,
            comment_id: id,
          }),
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);

          setReplyMessage("");
          window.alert("送出成功");
          getMessage();
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response);
          window.alert(error.response.data.message);
        });
    }
  };

  const getMessage = () => {
    axios
      .get(url + "comment/" + id + "/messages", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        const comment = response.data.commentContent;
        const messages = response.data.messages;
        console.log(comment);
        console.log(messages);
        setCurrentComment(comment);
        setMessages(messages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    getMessage();
  }, [id]);

  const handleDelete = (id) => {
    let result = window.confirm("確定刪除?");

    if (result) {
      axios
        .delete(url + "messages/" + id, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          window.alert("刪除成功");
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response);
          window.alert(error.response.data.message);
        });

      const newMessages = messages.filter((message) => message.id !== id);
      setMessages(newMessages);
    }
  };
  if (isLoading) {
    return <Typography variant="h5"> 載入中....</Typography>;
  }
  return (
    <Container className={classes.container}>
      {/* ------------Comment詳細介紹------------ */}
      <Card>
        <CardHeader title={"來自 " + currentComment.author + " 同學的評論"} />
        <CardContent>
          <Rating value={currentComment.rating} readOnly />
          <p>
            <Typography variant="body1" color="Primary">
              教學方式 : {currentComment.teaching}
            </Typography>
          </p>
          <p>
            <Typography variant="body1" color="Primary">
              作業方式: {currentComment.assignment}
            </Typography>
          </p>
          <p>
            <Typography variant="body1" color="Primary">
              評分方式: {currentComment.grading}
            </Typography>
          </p>

          <Typography variant="body1" color="Primary">
            其他補充:
            {currentComment.comment}
          </Typography>
        </CardContent>
      </Card>

      {/*------------留言評論------------ */}

      <Typography variant="body2" color="Primary" className={classes.title}>
        以下是該評論相關之留言
      </Typography>
      <List className={classes.root}>
        {messages.length === 0 ? (
          <Typography variant="h5"> 目前沒有留言喔 </Typography>
        ) : (
          messages.map((message) => (
            <ListItem>
              <Container>
                <Card elevation={0}>
                  {message.authorId === getId() ? (
                    <CardHeader
                      action={
                        <IconButton onClick={() => handleDelete(message.id)}>
                          <DeleteOutline />
                        </IconButton>
                      }
                      title={message.author + " 說:"}
                    />
                  ) : (
                    <CardHeader title={message.author + " 說:"} />
                  )}

                  <CardContent>
                    <Typography variant="textSecondary">
                      {message.message}
                    </Typography>
                  </CardContent>
                </Card>
              </Container>
            </ListItem>
          ))
        )}
      </List>

      {/*------------------------------這裡開始 Create Message---------------------*/}
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a new Message
      </Typography>
      {isLogin() ? (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setReplyMessage(e.target.value)}
            className={classes.field}
            label="Message"
            variant="outlined"
            color="secondary"
            multiline
            minRows={4}
            fullWidth
            required
            value={replyMessage}
            error={replyMessageError}
          />

          <Button
            type="submit"
            color="textSecondary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit your Message
          </Button>
        </form>
      ) : (
        <Typography variant="h5">請先登入才以留言喔</Typography>
      )}
    </Container>
  );
}
