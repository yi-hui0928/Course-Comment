import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Rating from "@material-ui/lab/Rating";
import { DeleteOutline, KeyboardArrowRight } from "@material-ui/icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getId, getToken, url } from "../../utils/localStorge";
import CommentUpdate from "../../components/CommentUpdate";

function UserPost() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  function getComments() {
    axios
      .get(url + "user/mypublish", {
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
        setComments(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  useEffect(() => {
    getComments();
  }, []);

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
    return <Typography variant="h5"> 載入中....</Typography>;
  }
  return (
    <div>
      <List>
        {comments.length == "0" && (
          <ListItem divider button>
            <Container>
              <Card elevation={0}>
                <Typography variant="h6">你還沒發表任何評論</Typography>
              </Card>
            </Container>
          </ListItem>
        )}
        {comments.map((comment) => (
          <div key={comment.id}>
            <ListItem>
              <Container>
                <Card>
                  <CardHeader
                    action={
                      <div>
                        <Button
                          onClick={() => {
                            history.push("/comments/" + comment.course_id);
                          }}
                          endIcon={<KeyboardArrowRight />}
                        >
                          看課程
                        </Button>
                        <CommentUpdate
                          comment={comment}
                          getComments={getComments}
                        ></CommentUpdate>
                        <IconButton onClick={() => handleDelete(comment.id)}>
                          <DeleteOutline />
                        </IconButton>
                      </div>
                    }
                    title={"來自 " + comment.author + " 同學的評論"}
                    subheader={
                      "發表於 " +
                      comment.department +
                      " 的 " +
                      comment.teacher +
                      " 教授的" +
                      comment.course_name
                    }
                  />

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
          </div>
        ))}
        <ListItem divider>
          {/* <MessageSubmit getMessage={getMessage} uid={uid} /> */}
        </ListItem>
      </List>
    </div>
  );
}

export default UserPost;
