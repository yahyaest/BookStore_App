import React, { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
  addComment,
  updateCommentCounter,
  updateCommentReplies,
} from "../redux/comments";
import { InputGroup, FormControl, Button } from "react-bootstrap";

function BookComment(props) {
  BookComment.prototype = {
    comments: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,

    addComment: PropTypes.func.isRequired,
    updateCommentCounter: PropTypes.func.isRequired,
    updateCommentReplies: PropTypes.func.isRequired,
  };

  const [newComment, setNewComment] = useState("");

  const [showReplies, setShowReplies] = useState([]);
  const [reply, setReply] = useState("");
  const [isReply, setIsReply] = useState([]);

  const { isAuthenticated, username, bookId, userId, comments, users } = props;

  const getBookComments = (id, comments) => {
    const bookComments = comments.filter((comment) => comment.book === id);
    return bookComments;
  };

  const mapToUserName = (userId, users) => {
    const user = users.filter((user) => user.id === userId);
    return user[0]?.username;
  };

  const getCommentDate = (commentDate) => {
    // time Passed in milliseconds
    const passdTime = Date.now() - Date.parse(commentDate);
    const secondes = Math.trunc(passdTime / 1000); // secondes
    const minutes = Math.trunc(passdTime / (1000 * 60)); // minutes
    const hours = Math.trunc(passdTime / (1000 * 3600)); // hours
    const days = Math.trunc(passdTime / (1000 * 3600 * 24)); // days
    const weeks = Math.trunc(passdTime / (1000 * 3600 * 24 * 7)); // weeks
    const months = Math.trunc(passdTime / (1000 * 3600 * 24 * 30)); // months
    const years = Math.trunc(passdTime / (1000 * 3600 * 24 * 365)); // years
    if (secondes < 60) return "Now";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 8) return `${days} days ago`;
    if (weeks < 4) return `${weeks} weeks ago`;
    if (months < 12) return `${months} months ago`;
    return `${years} years ago`;
  };

  const handleSendCommentButton = (comment) => {
    if (!isAuthenticated) alert("You need to log in to perform this action.");
    if (!newComment) alert("The comment field is empty.");
    else {
      let commentObject = {};
      commentObject.comment = comment;
      commentObject.like_counter = 0;
      commentObject.dislike_counter = 0;
      commentObject.comment_replies = [];
      commentObject.user = userId;
      commentObject.book = bookId;
      commentObject.like_submitter = [];
      commentObject.dislike_submitter = [];
      props.addComment(commentObject);
    }
  };

  const handleReplyButton = (index) => {
    if (!isAuthenticated) alert("You need to log in to perform this action.");
    else {
      let array = [...isReply];
      array[index] = true;
      setIsReply(array);
    }
  };

  const handleCancelButton = (index) => {
    if (!isAuthenticated) alert("You need to log in to perform this action.");
    else {
      let array = [...isReply];
      array[index] = false;
      setIsReply(array);
    }
  };

  const handleIncrementCounter = (comment, id) => {
    if (!isAuthenticated) alert("You need to log in to perform this action.");
    else {
      // Copy from comment Object with spread operator
      let tempComment = { ...comment };
      let submitter_like_list = [...tempComment.like_submitter];
      let submitter_dislike_list = [...tempComment.dislike_submitter];

      // get like and dislike submitter index
      const likeIndex = submitter_like_list.findIndex(
        (element) => element === username
      );
      const dislikeIndex = submitter_dislike_list.findIndex(
        (element) => element === username
      );

      // Logic for increment/decrement like/dislike counter
      if (likeIndex === -1) {
        submitter_like_list.push(username);
        tempComment.like_counter++;

        if (dislikeIndex !== -1) {
          submitter_dislike_list.splice(dislikeIndex, 1);
          tempComment.dislike_counter--;
        }
      } else {
        submitter_like_list.splice(likeIndex, 1);
        tempComment.like_counter--;
      }

      // Execution part
      tempComment.like_submitter = submitter_like_list;
      tempComment.dislike_submitter = submitter_dislike_list;
      props.updateCommentCounter(tempComment, id);
    }
  };

  const handleDecrementCounter = (comment, id) => {
    if (!isAuthenticated) alert("You need to log in to perform this action.");
    else {
      // Copy from comment Object with spread operator
      let tempComment = { ...comment };
      let submitter_like_list = [...tempComment.like_submitter];
      let submitter_dislike_list = [...tempComment.dislike_submitter];

      // get like and dislike submitter index
      const likeIndex = submitter_like_list.findIndex(
        (element) => element === username
      );
      const dislikeIndex = submitter_dislike_list.findIndex(
        (element) => element === username
      );

      // Logic for increment/decrement like/dislike counter
      if (dislikeIndex === -1) {
        submitter_dislike_list.push(username);
        tempComment.dislike_counter++;

        if (likeIndex !== -1) {
          submitter_like_list.splice(likeIndex, 1);
          tempComment.like_counter--;
        }
      } else {
        submitter_dislike_list.splice(dislikeIndex, 1);
        tempComment.dislike_counter--;
      }

      // Execution part
      tempComment.like_submitter = submitter_like_list;
      tempComment.dislike_submitter = submitter_dislike_list;
      props.updateCommentCounter(tempComment, id);
    }
  };

  const handleSendButton = (comment, id, submitter, index) => {
    if (!reply) alert("The reply field is empty.");
    else {
      let tempComment = { ...comment };
      let replyObject = { submitter, body: reply };
      let replies = [...tempComment.comment_replies];

      replies.push(replyObject);
      tempComment.comment_replies = replies;
      props.updateCommentReplies(tempComment, id);
      // Hide reply input
      
      let array = [...isReply];
      array[index] = false;
      setIsReply(array);
    }
  };

  const handleShowReplies = (index) => {
    let array = [...showReplies];
    array[index] = !array[index];
    setShowReplies(array);
  };

  const onChangeComment = (e) => {
    setNewComment(e.currentTarget.value);
  };

  const onChangeReply = (e) => {
    setReply(e.currentTarget.value);
  };

  const handleCounterButtonColor = (list) => {
    const found = list.findIndex((element) => element === username);
    if (found === -1) return "like";
    else return "selectedLike";
  };

  return (
    <React.Fragment>
      <div className="book__comments">
        <InputGroup className="comment__add">
          <FormControl
            placeholder="Add your comment..."
            aria-label="Add your reply"
            aria-describedby="basic-addon2"
            onChange={onChangeComment}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => handleSendCommentButton(newComment)}
            >
              Send
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {getBookComments(bookId, comments).map((comment, index) => (
          <div key={comment.id} className="book__comment">
            <div className="comment__header">
              <strong className="comment__submitter">
                {mapToUserName(comment.user, users)}
              </strong>
              <p className="comment__date">
                {getCommentDate(comment.created_at)}
              </p>
            </div>
            <p>{comment.comment}</p>
            <div className="comment__reactions">
              <i
                className={`fa fa-thumbs-up ${handleCounterButtonColor(
                  comment.like_submitter
                )}`}
                onClick={() => handleIncrementCounter(comment, comment.id)}
              >
                {" "}
                {comment.like_counter}
              </i>
              <i
                className={`fa fa-thumbs-down ${handleCounterButtonColor(
                  comment.dislike_submitter
                )}`}
                onClick={() => handleDecrementCounter(comment, comment.id)}
              >
                {" "}
                {comment.dislike_counter}
              </i>
              <Button
                variant="light"
                size="sm"
                onClick={() => handleReplyButton(index)}
              >
                Reply
              </Button>
            </div>
            {isReply[index] && (
              <InputGroup className="comment__reply">
                <FormControl
                  placeholder="Add your reply"
                  aria-label="Add your reply"
                  aria-describedby="basic-addon2"
                  onChange={onChangeReply}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-dark"
                    onClick={() => handleCancelButton(index)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleSendButton(comment, comment.id, username,index)
                    }
                  >
                    Send
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            )}
            <div
              className="comment__showReplies"
              onClick={() => handleShowReplies(index)}
            >
              {showReplies[index] ? (
                <React.Fragment>
                  <i className="fa fa-sort-up"></i>
                  <p>Hide replies</p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <i className="fa fa-sort-down"></i>
                  <p>Show replies</p>
                </React.Fragment>
              )}
            </div>

            <div className="comment__replies">
              {showReplies[index] &&
                comment.comment_replies.map((reply, index) => (
                  <div key={index} className="comment__reply">
                    <strong>{reply.submitter}</strong>
                    <p>{reply.body}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  users: state.users.users,
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username,
  userId: state.auth.user?.id,
});

export default connect(mapStateToProps, {
  addComment,
  updateCommentCounter,
  updateCommentReplies,
})(BookComment);
