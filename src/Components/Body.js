import React, { Component } from 'react';
import Navigation from './Navigation';
import PageContent from './page-content';
import PokeCollection from './PokeCollection';

class Body extends Component {
  render() {    
    return (
      <div className="body">
        <Navigation 
          searchPokemon={this.props.searchPokemon}
          resetDash={this.props.resetDash}
        />
        <PageContent />
        <PokeCollection 
          collection={this.props.collection}
          deletePokemon={this.props.deletePokemon}
        />
      </div>
    );     
  }
}
export default Body;