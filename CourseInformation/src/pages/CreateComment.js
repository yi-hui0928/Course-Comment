import React from "react";
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { getToken, isLogin, url } from "../utils/localStorge";

const useStyle = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function CreateComment() {
  const { id } = useParams(); //接參數
  const classes = useStyle();
  const history = useHistory();
  const [rating, setRating] = useState("");
  const [teaching, setTeaching] = useState("");
  const [grading, setGrading] = useState("");
  const [assignment, setAssignment] = useState("");
  const [comment, setComment] = useState("");
  const [gradingError, setGradingError] = useState("");
  const [assignmentError, setAssignmentError] = useState("");
  const [teachingError, setTeachingError] = useState("");
  const [commentError, setCommentError] = useState("");

  if (!isLogin()) {
    console.log(" pssss");
    window.alert("請先登入");
    history.push("/login");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

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
        .post(
          url + "comments",
          new URLSearchParams({
            rating,
            grading,
            assignment,
            comment,
            teaching,
            course_id: id,
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
          history.push("/comments/" + id);
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
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        幫這門課建立新的評論
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormControl className={classes.field}>
          <FormLabel>這門課有幾分</FormLabel>
          <RadioGroup
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <FormControlLabel value="0" control={<Radio />} label="0" />
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
            <FormControlLabel value="5" control={<Radio />} label="5" />
          </RadioGroup>
        </FormControl>

        <TextField
          onChange={(e) => setGrading(e.target.value)}
          className={classes.field}
          label="評分方式"
          variant="outlined"
          color="secondary"
          fullWidth
          required
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
          error={assignmentError}
        />
        <TextField
          onChange={(e) => setTeaching(e.target.value)}
          className={classes.field}
          label="教學方式"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={teachingError}
        />
        <TextField
          onChange={(e) => setComment(e.target.value)}
          className={classes.field}
          label="其他補充"
          variant="outlined"
          color="secondary"
          multiline
          minRows={4}
          fullWidth
          required
          error={commentError}
        />

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit your comment
        </Button>
      </form>
    </Container>
  );
}
