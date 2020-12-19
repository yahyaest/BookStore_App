import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadBook } from "./../redux/books";
import BookComment from "./bookComment";
import BookInfo from "./bookInfo";
import NavBar from "./../common/navbar";
import Footer from "./../common/footer";

function BookInfoPage(props) {
  BookInfoPage.propTypes = {
    book: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    username: PropTypes.string,
    loadBook: PropTypes.func.isRequired,
  };
  const bookId = props.match.params.id;
  const { book, username, users } = props;
  const [user, setUser] = useState({});

  const getUser = () => {
    const profile = users.filter((user) => user.username === username);
    setUser(profile[0]);
  };

  useEffect(() => {
    props.loadBook(bookId);
    getUser();
  }, [users]);

  return (
    <React.Fragment>
      <NavBar />
      <BookInfo book={book} user={user} />
      <div className="comments__component">
        <h3>Comments</h3>

        <BookComment bookId={book.id} />
      </div>
      <Footer />;
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  book: state.books.currentBook,
  username: state.auth.username,
  users: state.users.users,
});

export default connect(mapStateToProps, {
  loadBook,
})(BookInfoPage);
