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
          <button className="deleteButton" onClick={() => this.props.hidePokemon(id)}>
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
        <li className="poke-number">n.{id}</li>
      </div>                
    );
  }
}
export default PokeCard;

//  <li className="poke-type">
//   {types.map((item) => (
//     <span id="type" key={item.type.name} className={item.type.name}>{item.type.name}  </span>
//   ))}
// </li>