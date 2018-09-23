import React from "react";

import Shelf from "./Shelf";

class BookList extends React.Component {
  render() {
    const books = this.props.books;
    const currentlyReading = books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter(book => book.shelf === "wantToRead");
    const read = books.filter(book => book.shelf === "read");
    console.log("AM HERE");
    console.log(currentlyReading);
    return (
      <div className="list-books-content">
        <div>
          <Shelf books={currentlyReading} />
          <Shelf books={wantToRead} />
          <Shelf books={read} />
        </div>
      </div>
    );
  }
}

export default BookList;
