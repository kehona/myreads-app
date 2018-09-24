import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Search from "./components/Search";
import Shelves from "./components/Shelves";
import SearchButton from "./components/SearchButton";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: []
    };
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(allBooks => this.setState({ allBooks }));
  }

  /**
   * update the shelf a book belongs to.
   * @param {*} book that is to be moved
   * @param {*} shelf to be moved to
   */
  updateBookShelf(book, shelf) {
    this.setState(state => ({
      allBooks: state.allBooks.map(b => {
        b.id === book.id ? (b.shelf = shelf) : b;
        return b;
      })
    }));
    BooksAPI.update(book, shelf);
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search} />

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <Shelves
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
        />
      </div>
    );
  }
}

export default BooksApp;
