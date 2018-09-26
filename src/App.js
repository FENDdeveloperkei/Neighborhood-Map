import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './components/Search.jsx';
import Bookshelf from './components/Bookshelf.jsx';
import './App.css';

class BooksApp extends Component {
    // state to hold all the books in the bookshelf
    state = {
        books: []
    }

    // after component mounts, gets all books then puts it in the state
    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({books});
        });
    }

    // function to change shelves for the books, then it runs componentDidMount function to set state
    changeShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.componentDidMount());
    }

    render() {
        const {books} = this.state;
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                      <div className="list-books-title">
                        <h1>MyReads</h1>
                      </div>
                      <Bookshelf books={books} changeShelf={this.changeShelf.bind(this)} />
                      <div className="open-search">
                        <Link to="/search">Add a book</Link>
                      </div>
                    </div>
                )}/>
                <Route path='/search' render={() => (
                    <Search books={books} changeShelf={this.changeShelf.bind(this)} />
                )}/>
            </div>
        )
    }
}

export default BooksApp;
