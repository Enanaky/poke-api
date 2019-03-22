import React, { Component } from 'react';
import PokeDesk from './PokeDesk';

class Search extends Component {
    //Create a Ref to the search input.
    pokeRef = React.createRef();

  submitSearch = e => {
    //Stop the search for submitting.
    e.preventDefault();
    //Save the input in a const.
    const search = this.pokeRef.current.value;
    this.props.fetchPokemon(search);
    //Reset the search
    e.currentTarget.reset();
  };

  render() {
    return(
      <div>
        <div className="search-bar">
          <form className="form" onSubmit={this.submitSearch}>
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
            <input
              type="submit"
              value=""
              className="search-button"
            />
          </form>
          <span id="trash-button">
            <input
              type="submit"
              value=""
              className="trash-button"
              onClick={this.props.deletePokeDesk}
            />
          </span>
          </div>   
            <PokeDesk 
              desk={this.props.desk}
              deletePokemon={this.props.deletePokemon}
          />
      </div>
    );
  }
}
export default Search;