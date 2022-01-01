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

import Rating from "@material-ui/lab/Rating";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getId, getToken, url } from "../../utils/localStorge";

function UserPost() {
  const History = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  useEffect(() => {
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
  }, []);

  const handleDelete = () => {
    axios
      .delete(url + "user/mypublish", {
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
  };
  const handleUpdate = () => {};

  // if (isLoading) {
  //   return <Typography variant="h5"> 載入中....</Typography>;
  // }
  return (
    <div>
      <List>
        {comments.length == "0" && (
          <ListItem divider button>
            <Container>
              <Card elevation={0}>
                <Typography variant="h6">
                  還沒有人留下對這個人的評論喔!
                </Typography>
              </Card>
            </Container>
          </ListItem>
        )}
        {comments.map((comment) => (
          <ListItem button divider key={comment.id}>
            <Container>
              <Card elevation={0}>
                <CardHeader
                  action={
                    <div>
                      <Button onClick={() => handleUpdate(comment.id)}>
                        修改
                      </Button>
                      <IconButton onClick={() => handleDelete(comment.id)}>
                        <DeleteOutline />
                      </IconButton>
                    </div>
                  }
                  title={comment.teacher}
                />
                <CardContent>
                  <Rating readOnly value={comment.rating}>
                    {comment.comment}
                  </Rating>
                  <Typography variant="body2" color="textSecondary">
                    {comment.comment}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {comment.comment}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {comment.comment}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {comment.comment}
                  </Typography>
                </CardContent>
              </Card>
            </Container>
          </ListItem>
        ))}
        <ListItem divider>
          {/* <MessageSubmit getMessage={getMessage} uid={uid} /> */}
        </ListItem>
      </List>
    </div>
  );
}

export default UserPost;
