import React from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "../BooksAPI";

class Search extends React.Component {
  state = {
    query: "",
    searchBooks: []
  };
  handleSearch(query) {
    this.setState({
      query: query
    });
    if (query !== "") {
      BooksAPI.search(query).then(bks => {
        if (!bks.error) {
          console.log(bks);
          // set state for seach
          this.setState({
            searchBooks: bks.filter(b => b.imageLinks !== undefined) // filter out books without imagelinks
          });
        } else {
          console.log(bks);
          this.setState({
            searchBooks: []
          });
        }
      });
    } else {
      this.setState({
        searchBooks: []
      });
    }
  }
  /**
   * update the shelf a book belongs to.
   * @param {*} book that is to be moved
   * @param {*} shelf to be moved to
   */
  handleChange(book, shelf) {
    this.setState(state => ({
      searchBooks: state.searchBooks.map(b => {
        b.id === book.id ? (b.shelf = shelf) : b;
        return b;
      })
    }));
    // add to shelf
    this.props.changeBookShelf(book, shelf);
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={e => {
                this.handleSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf === undefined ? "none" : book.shelf}
                        onChange={e => this.handleChange(book, e.target.value)}
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
