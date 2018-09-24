import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";

import Search from "./components/Search";
import BookList from "./components/BookList";
import SearchButton from "./components/SearchButton";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false
    };
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }
  
  componentDidMount() {
    BooksAPI.getAll().then(allBooks => this.setState({ allBooks }));
  }

  /**
   * 
   * @param {*} book that is to be moved
   * @param {*} shelf to be moved to
   */
  updateBookShelf(book, shelf) {
    this.setState(state => ({
      allBooks: state.allBooks.map(b => {
        b.id === book.id ? b.shelf = shelf : b; 
        return b;
      })
    }));
  }
  render() {
    console.log(this.state.allBooks);
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
            <BookList
              books={this.state.allBooks}
              changeBookShelf={this.updateBookShelf}
            />
            <SearchButton
              books={this.state.allBooks}
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
