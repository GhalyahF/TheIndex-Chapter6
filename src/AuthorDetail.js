import React, { Component } from "react";

// Components
import BookTable from "./BookTable";

// import store
import authorStore from "./stores/AuthorStore";
import bookStore from "./stores/BookStore";

class AuthorDetail extends Component {
  render() {
    const authorID = this.props.match.params.authorID;
    const author = authorStore.getAuthorById(authorID);
    const books = author.books.map(bookID => bookStore.getBookById(bookID));

    console.log(author.first_name);
    return (
      <div className="author">
        <div>
          <h3>{author.first_name + " " + author.last_name}</h3>
          <img
            src={author.imageUrl}
            className="img-thumbnail img-fluid"
            alt={author.first_name + " " + author.last_name}
          />
        </div>
        <BookTable books={books} />
      </div>
    );
  }
}

export default AuthorDetail;
