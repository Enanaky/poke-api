import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Body from './Body';

class App extends Component {
  constructor() {
    super();
    this.state = {
      collection: null,
      search: null,
    };
  }
  
  searchPokemon = (poke) => {  
    fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
      .then(response => response.json())
      .then(poke => this.savePokemon(poke));  
    // fetch(`https://pokeapi.co/api/v2/evolution-chain/1`)
    //   .then(response => response.json())
    //   .then(evol => console.log(evol));
    // fetch(`https://pokeapi.co/api/v2/pokemon-species/1/`)
    //   .then(response => response.json())
    //   .then(vevo => console.log(vevo));      
  }    

  savePokemon = (poke) => {
    const copy = this.state.collection;
    const pokes = { ...copy, [poke.id]: poke }
    this.setState(
      { collection: pokes }, () => console.log(this.state.collection)    
    );
  }

  resetDash = () => {
    this.setState({ collection: null });
  }
  

  deletePokemon = (id) => {
    const copy = { ...this.state.collection };
    delete copy[id];
    this.setState({ collection: copy });    
  }
  componentDidMount() {}

  componentWillUpdate() {}

  render() {
    return(
      <div className="container">
        <div className="app">
          <Header />
          <Body 
            collection={this.state.collection} 
            deletePokemon={this.deletePokemon}
            searchPokemon={this.searchPokemon}
            resetDash={this.resetDash}
          />
        </div>
      </div>
    );
  }
}
export default App;
