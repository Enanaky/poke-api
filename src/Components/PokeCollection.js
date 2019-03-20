import React, { Component } from 'react';
import PokemonPreview from './PokemonPreview';
import FullSpecs from './FullSpecs';

class PokeCollection extends Component {

  render() {    
    const { collection } = this.props;
    // const pokes = this.props.pokes;

    //promess conditional
    if (collection) {
      const pokeCollection = Object.values(collection);
      return (
        <div className="poke-dash">
          {pokeCollection.map((poke) => (
            <PokemonPreview 
              key={poke.id} 
              pokemon={poke} 
              deletePokemon={this.props.deletePokemon}
              />
          ))}
        </div>
      );
    } else {
      return '';
    }    
  }
}

export default PokeCollection;

