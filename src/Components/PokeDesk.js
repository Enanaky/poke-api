import React, { Component } from 'react';
import PokeCard from './PokeCard';

class PokeDesk extends Component {

  render() {    
    const { desk } = this.props;

    // function handleClickCard(id) {
    //   console.log(id);      
        
    // }

    //promess conditional
    if (desk) {
      const pokeDesk = Object.values(desk);
      return (
        <div>
          <div className="poke-dash">
            {pokeDesk.map((poke) => (
              <PokeCard 
                key={poke.id} 
                pokemon={poke} 
                deletePokemon={this.props.deletePokemon}
                // handleClickCard={handleClickCard}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return '';
    }    
  }
}

export default PokeDesk;

