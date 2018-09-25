import React from "react";

import Shelf from "./Shelf";

class Shelves extends React.Component {
  render() {
    const books = this.props.books;
    console.log(books);
    const currentlyReading = books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter(book => book.shelf === "wantToRead");
    const read = books.filter(book => book.shelf === "read");
    const changeShelf = this.props.changeBookShelf;

    return (
      <div className="list-books-content">
        <div>
          <Shelf
            books={currentlyReading}
            title={"Currently Reading"}
            changeShelf={changeShelf}
          />
          <Shelf
            books={wantToRead}
            title={"Want To Read"}
            changeShelf={changeShelf}
          />
          <Shelf books={read} title={"Read"} changeShelf={changeShelf} />
        </div>
      </div>
    );
  }
}

export default Shelves;
