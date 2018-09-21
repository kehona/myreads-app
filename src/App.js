import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";

import Search from "./components/Search";
import BookList from "./components/BookList";
import SearchButton from "./components/SearchButton";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  render() {
    const allBooks = [];
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            closeSearch={() => {
              this.setState({ showSearchPage: false });
            }}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList books={allBooks} />
            <SearchButton
              books={allBooks}
              showSearchPage={() => {
                this.setState({ showSearchPage: true });
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
