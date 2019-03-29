import React, { Component } from 'react';
import PokeCard from './PokeCard';

class PokeDeck extends Component {

  // getPokeCards render only the "visible" pokemons
  getPokeCards = function(pokeDeck) {
    const pokeCards = [];
    pokeDeck.forEach(pokemon => {
      if(pokemon.visible){
        pokeCards.push(
          <PokeCard 
            key={pokemon.id} 
            pokemon={pokemon} 
            hidePokemon={this.props.hidePokemon}
            handleClickCard={this.props.handleClickCard}
          />
        )          
      }  
    });
    return pokeCards;        
  }
  
  render() {    
    const { collection } = this.props;
    if (collection) {
      const pokeDeck = Object.values(collection);
      return (        
        <div className="poke-dash">
          {
            this.getPokeCards(pokeDeck)
          }
        </div>        
      );
    } else {
      return '';
    }    
  }
}

export default PokeDeck;