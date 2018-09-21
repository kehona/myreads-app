import React from "react";

import Shelf from "./Shelf";

class BookList extends React.Component {  
  render() {
    const books = this.props.books;
    return (
      <div className="list-books-content">
        <div>
          <Shelf />
          <Shelf />
          <Shelf />
        </div>
      </div>
    );
  }
}

export default BookList;
