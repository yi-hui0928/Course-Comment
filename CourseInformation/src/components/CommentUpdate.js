import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  FormControl,
  makeStyles,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Slider,
} from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";
import { getToken, url } from "../utils/localStorge";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    dispaly: "block",
  },
});
export default function CommentUpdate({ getComments, comment }) {
  const classes = useStyles();
  //路由
  const history = useHistory();
  //對話框展開
  const [open, setOpen] = React.useState(false);
  //表單
  const [rating, setRating] = useState("");
  const [teaching, setTeaching] = useState("");
  const [grading, setGrading] = useState("");
  const [assignment, setAssignment] = useState("");
  const [commentData, setCommentData] = useState("");
  //錯誤處裡
  const [gradingError, setGradingError] = useState("");
  const [assignmentError, setAssignmentError] = useState("");
  const [teachingError, setTeachingError] = useState("");
  const [commentError, setCommentError] = useState("");
  const handleClickOpen = () => {
    setRating(comment.rating);
    setTeaching(comment.teaching);
    setGrading(comment.grading);
    setAssignment(comment.assignment);
    setCommentData(comment.comment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = window.confirm("確定修改?");
    if (!result) {
      return;
    }
    setGradingError(false);
    setAssignmentError(false);
    setTeachingError(false);

    if (grading === "") {
      setGradingError(true);
    }
    if (assignment === "") {
      setAssignmentError(true);
    }

    if (teaching === "") {
      setTeachingError(true);
    }

    if (rating && grading && assignment && teaching) {
      axios
        .patch(
          url + "comments/" + comment.id,
          new URLSearchParams({
            rating,
            grading,
            assignment,
            comment: commentData,
            teaching,
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
          window.alert("送出成功");
          handleClose();
          getComments();
          return;
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response);
          window.alert(error.response.data.message);
        });
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>修改</Button>
      <Dialog open={open} onClose={handleClose}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogTitle>修改資料</DialogTitle>
          <DialogContent>
            <Slider
              defaultValue={20}
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={5}
            />
            <TextField
              onChange={(e) => setGrading(e.target.value)}
              className={classes.field}
              label="評分方式"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              minRows={4}
              value={grading}
              error={gradingError}
            />
            <TextField
              onChange={(e) => setAssignment(e.target.value)}
              className={classes.field}
              label="作業方式"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              minRows={4}
              value={assignment}
              error={assignmentError}
            />
            <TextField
              onChange={(e) => setTeaching(e.target.value)}
              className={classes.field}
              label="教學方式"
              variant="outlined"
              color="secondary"
              fullWidth
              minRows={4}
              required
              value={teaching}
              error={teachingError}
            />
            <TextField
              onChange={(e) => setCommentData(e.target.value)}
              className={classes.field}
              label="其他補充"
              variant="outlined"
              color="secondary"
              multiline
              minRows={4}
              fullWidth
              required
              value={commentData}
              error={commentError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              確定修改
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
