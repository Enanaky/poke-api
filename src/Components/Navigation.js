import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    //Create a Ref to the search input.
    pokeRef = React.createRef();

  submitSearch = e => {
    //Stop the search for submitting.
    e.preventDefault();
    //Save the input in a const.
    const search = this.pokeRef.current.value;
    this.props.searchPokemon(search);
    //Reset the searchBar
    e.currentTarget.reset();
  };

  render() {
    return(
      <div className="navbar">
        <form className="form" onSubmit={this.submitSearch}>
          <NavLink exact to="/PokeCollection">
            <input
              autoComplete='off'
              type="text"
              id="search-input"
              placeholder="Name/Number"
              onFocus={e => e.target.placeholder = ' '}
              onBlur={e => e.target.placeholder = "Name/Number"}
              ref={this.pokeRef}
              required
            />            
          </NavLink>
          <input
            type="submit"
            value=""
            className="search-button"
          />
        </form>
        <input
          type="submit"
          value=""
          className="trash-button"
          onClick={this.props.resetDash}
        />
        <div>
          <NavLink exact to="/FullSpecs">
            Details
          </NavLink>
        </div>
      </div>
    );
  }
}
export default Navigation;