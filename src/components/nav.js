import React, { Component } from 'react'
import '../App.css';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };

    this.formHandler = this.formHandler.bind(this);
  }

  //formHandler: sets state typed query in input
  formHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { searchInput } = this.state;
    return (
      <div className="searchNav">
        <h2>Crete Venue Search</h2>
        <input
              className="search"
              onChange={this.formHandler}
              type="text"
              placeholder="Search Venue"
              name="searchInput"
              id="searchInput"
              value={searchInput}
              aria-labelledby="search-venue"
        />
        <button 
              id="search-venue"
              className="searchBtn" 
              aria-labelledby="Search-button"
              onClick={() => this.props.getVenues(searchInput)}
              >
          Search
        </button>
      </div>
    )
  }
}
