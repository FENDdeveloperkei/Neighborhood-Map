import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book.jsx';

class Search extends Component {
    // the search results and search query is stored in the state
    state = {
        results: [],
        query: ''
    }

    // sets the query in the state and runs the searchLibrary function
    handleSearch(query) {
        this.setState({ query });
        this.searchLibrary(query);
    }

    // searches the library based on the query with error handling
    searchLibrary(query) {
        if (query) {
            BooksAPI.search(query).then(results => {
                if (results.error) {
                    this.setState({ results: [] });
                } else {
                    this.setState({ results });
                };
            });
        } else {
            this.setState({ results: [] });
        }
    }

    render() {
        const {results, query} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={event => this.handleSearch(event.target.value)} value={query}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {results.map(result => {
                            let shelf = 'none';
                            this.props.books.map(book => (
                                book.id === result.id ? shelf = book.shelf : ''
                            ))
                            return (<li key={result.id}><Book books={result} changeShelf={this.props.changeShelf} currentShelf={shelf} /></li>)})
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;
