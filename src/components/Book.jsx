import React, { Component } from 'react';

class Book extends Component {
    render() {
        const {books} = this.props;
        const {title} = books;
        const imgUrl = books.imageLinks ? `url(${books.imageLinks.thumbnail})` : 'url("http://via.placeholder.com/200x13")';
        const author = books.authors? books.authors[0] : 'N/A';
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `${imgUrl}` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={event => this.props.changeShelf(this.props.books, event.target.value)} value={this.props.currentShelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{author}</div>
            </div>
        )
    }
}

export default Book;
