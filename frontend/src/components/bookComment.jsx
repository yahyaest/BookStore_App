import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

function BookComment(props) {
  BookComment.prototype = {
    comments: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
  };

  const { bookId, comments, users } = props;
  
  const getBookComments = (id, comments) => {
   const bookComments = comments.filter((comment) => comment.book === id);
   return bookComments;
  };
  
  const mapToUserName = (userId, users) => {
   const user = users.filter((user) => user.id === userId);
   return user[0]?.username;
  };

  return (
    <React.Fragment>
      <div className="book__comments">
        {getBookComments(bookId, comments)?.map((comment) => (
          <div key={comment.id} className="book__comment">
            <strong>{mapToUserName(comment.user, users)}</strong>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  users: state.users.users,
});

export default connect(mapStateToProps, {})(BookComment);
