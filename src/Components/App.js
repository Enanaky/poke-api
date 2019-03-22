import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";

import Header from './Header';
import NavBar from './NavBar';
import Home from './Home';
import Search from './Search';
import PokeDetails from './PokeDetails'

class App extends Component {
  constructor() {
    super();
    this.state = {
      collection: null,
      desk: null,
      search: null,
    };
  }
  
  fetchPokemon = (poke) => {  
    fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
      .then(response => response.json())
      .then(poke => {
        this.savePokemon(poke);
        this.manageSimpleData(poke);
      });  
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${poke}`)
      .then(response => response.json())
      .then(species => console.log('species: ', species));
    fetch(`https://pokeapi.co/api/v2/evolution-chain/${poke}`)
      .then(response => response.json())
      .then(evol => console.log('evol', evol));
    // fetch(`https://pokeapi.co/api/v2/language/9/`)
    //   .then(response => response.json())
    //   .then(evol => console.log('lang', evol));
  }  
  manageSimpleData = (poke) => {    
    const pokemon = {
      id: poke.id,
      name: poke.name,
      height: poke.height,
      weight: poke.weight,
      types: poke.types.map(item => item.type.name),
      images: { default: poke.sprites.front_default, shiny: poke.sprites.front_shiny },
      stats: { 
        speed: poke.stats[0].base_stat,
        special_defense: poke.stats[1].base_stat,           
        special_attack: poke.stats[2].base_stat,
        defense: poke.stats[3].base_stat,
        attack: poke.stats[4].base_stat,
        hp: poke.stats[5].base_stat,
        },
      // color: vevo.color.name, 
    }    
    return console.log(pokemon);
  }
  
    // manageSpeciesData = (pokemon) => {
    //   console.log(pokemon);
      
    // }

  savePokemon = (poke) => {
    console.log(poke);
    
    const collectionUpdated = { ...this.state.collection, [poke.id]: poke }
    const deskUpdated = { ...this.state.desk, [poke.id]: poke }    
    this.setState({
      collection: collectionUpdated,
      desk: deskUpdated, 
    }    
    );
  }
  // , () => console.log(this.state.desk)
  deletePokeDesk = () => {
    this.setState({ desk: null });
  }  

  deletePokemon = (id) => {
    const deskCopy = { ...this.state.desk };
    delete deskCopy[id];
    this.setState({ desk: deskCopy });    
  }

  componentDidMount() {}

  componentWillUpdate() {}

  render() {
    return(
      <div className="container">
        <div className="app">
          <Header />
          <NavBar />
          <div className="body">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route 
                path="/Search" 
                render={props => <Search {...props}
                  desk={this.state.desk} 
                  fetchPokemon={this.fetchPokemon}
                  deletePokemon={this.deletePokemon}
                  deletePokeDesk={this.deletePokeDesk}
                />}
              />  
              <Route exact path="/PokeDetails" component={PokeDetails} />
            </Switch> 
          </div>
        </div>
      </div>
    );
  }
}
export default App;

