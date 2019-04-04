import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class PokeCard extends Component {
  render() {
    const pokemon = this.props.pokemon;
    const { name, id, images: { shiny: image } } = pokemon;

    function upperCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }  

    return (
      <div className="poke" >
        <div className="poke-title">
          <span className="poke-name">{upperCase(name)}</span>
          <li className="poke-numberMax600">n.{id}</li>
          <button className="deleteButtonMin600" onClick={() => this.props.hidePokemon(id)}>
            x
          </button>
        </div>
        <div className="img-container">
          <Link className="link-img" to="/PokeDetails" key={id}>
            <img 
              className="poke-img" 
              src={image} 
              alt="poke-img"
              onClick={() => this.props.handleClickCard(id)}
            >
            </img>
          </Link>
        </div>
        <button className="deleteButtonMax600" onClick={() => this.props.hidePokemon(id)}>
            <span>x</span>
          </button>
        <li className="poke-numberMin600">n.{id}</li>
      </div>                
    );
  }
}
export default PokeCard;
