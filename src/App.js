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
    let bk = this.state.allBooks.filter(b => b.id === book.id);
    console.log(bk);
    if (bk.length === 0) {
      // add new book
      book["shelf"] = shelf;
      this.setState(state => ({
        allBooks: state.allBooks.concat([book])
      }));
    } else {
      this.setState(state => ({
        allBooks: state.allBooks.map(b => {
          b.id === book.id ? (b.shelf = shelf) : b;
          return b;
        })
      }));
    }
    BooksAPI.update(book, shelf);
    console.log(this.state.allBooks);
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => <Search changeBookShelf={this.updateBookShelf} />}
        />

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
                query={this.state.query}
                result={this.state.searchResult}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
