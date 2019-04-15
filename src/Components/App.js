import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';

// Components
import Header from './Header';
import NavBar from './NavBar';
import Home from './Home';
import Search from './Search';
import PokeDetails from './PokeDetails'

// Services
import pokeApi from '../Services/pokeApi';

class App extends Component {
  constructor() {
    super();
    this.state = {
      collection: null,
      didYouKnow: null,
      total: 0,
      pokeFullDetails: null,
      error: false,
    };
    //I allow functions to access "App component" 
    this.searchIt = this.searchIt.bind(this);
    this.pokeRandom = this.pokeRandom.bind(this);
  }

  pokeRandom = () => {
    this.setState({
      didYouKnow: null,
      total: 0,
    })
    for (let i = 0; i < 8; i++) {
      const poke = Math.floor(Math.random() * 151) + 1;
      this.handleSearch(poke);
    }
  }
  // This is where the app checks if already have the pokemon.
  checkIfIHaveIt = (pokeSearchCriteria) => {
    const total = this.state.total;
    if (total === 8) {
      this.handleSearch(pokeSearchCriteria);
    } else {
      let gotIt = false;
      let poke = null;
      const copyCollection = Object.values(this.state.collection);
      copyCollection.forEach(item => {
        if (item.id === parseInt(pokeSearchCriteria) || item.name === pokeSearchCriteria) {
          gotIt = true;
          poke = item;
        }
      });
      if (gotIt) {
        const copy = { ...this.state.collection };
        copy[poke.id].visible = true;
        this.setState({ collection: copy })
      } else {
        this.handleSearch(pokeSearchCriteria);
      }
    }
  }
  async handleSearch(pokeSearchCriteria) {
    try {
      const poke = await this.searchIt(pokeSearchCriteria);
      //  Persist poke in State
      this.savePokemon(poke);
    } catch (err) { }
  }
  // This method Fetch the data, make the poke-Model and persist data in state.
  async searchIt(searchData) {
    this.setState({
      error: false,
    });
    try {
      // 1. Fetch basic pokemon data
      const basicData = await pokeApi.getPokemon(searchData);
      // 2. Fetch Species Data with pokemon Name      
      const specieData = await pokeApi.getSpeciesData(searchData);
      // 3. Extract Evolution Chain
      const evolutionUrl = specieData.evolution_chain.url;
      // 4. Fetch Evolution Chain
      const evolutionData = await pokeApi.getResource(evolutionUrl);
      // 5. Compose Pokemon model
      const pokemon = this.makePokemonCard(basicData, specieData, evolutionData);
      return pokemon;
      // 6. Catchin posibles errors
    } catch (err) {
      console.log(err);
      if (err) {
        this.setState({
          error: true,
        });
      }
    }
  }
  //POKEMON MODEL//p: basic / s: specie / e: evol
  makePokemonCard = (p, s, e) => {
    // console.log('p: ', p);
    // console.log('s: ', s);
    // console.log('e: ', e);    
    const pokemon = {

      visible: true,

      // Base
      id: p.id,
      name: p.name,
      height: p.height,
      weight: p.weight,
      types: p.types.map(item => item.type.name),
      images: { default: p.sprites.front_default, shiny: p.sprites.front_shiny },
      stats: {
        speed: p.stats[0].base_stat,
        special_defense: p.stats[1].base_stat,
        special_attack: p.stats[2].base_stat,
        defense: p.stats[3].base_stat,
        attack: p.stats[4].base_stat,
        hp: p.stats[5].base_stat,
      },

      // Species
      color: s.color.name,
      egg_groups: s.egg_groups.map(item => item.name),
      genera: s.genera
        .map(item => (item.language.name === 'en') ? item.genus : 0)
        .filter(item => item !== 0),
      generation: s.generation.name,
      habitat: s.habitat,
      description: s.flavor_text_entries
        .map(item => (item.language.name === 'en') ? item.flavor_text : 0)
        .filter(item => item !== 0)[0],

      // Evolution
      evolution_chain: (this.evolutionChain(e.chain)),
    }
    // console.log(pokemon);

    return pokemon;
  }
  //Evolution chain Attribute Maker
  evolutionChain(e) {
    const chain = [];
    if (e.evolves_to.length === 0) {
      chain.push(e.species.name);
    } else {
      if (e.evolves_to.length === 1) {
        const response = this.evolutionChain(e.evolves_to[0]);
        return [e.species.name, ...response];
      } else {
        const array = e.evolves_to.map(item => item.species.name);
        return [e.species.name, array];
      }
    }
    return chain;
  }
  // here is where the pokemon Object is storaged in State.
  savePokemon = (poke) => {
    let plusOne = this.state.total;
    if (plusOne < 8) {
      const didYouKnowUpdated = { ...this.state.didYouKnow, [poke.id]: poke }
      plusOne++;
      this.setState({
        didYouKnow: didYouKnowUpdated,
        total: plusOne,
      });
    } else {
      const collectionUpdated = { ...this.state.collection, [poke.id]: poke }
      plusOne++;
      this.setState({
        collection: collectionUpdated,
        total: plusOne,
      });
    }
  }
  hideDeck = () => {
    const copyCollection = Object.values(this.state.collection);
    if (copyCollection) {
      copyCollection.forEach(item => {
        this.hidePokemon(item.id);
      });
    }
  }
  hidePokemon = (id) => {
    const collectionCopy = { ...this.state.collection };
    collectionCopy[id].visible = false;
    this.setState({ collection: collectionCopy });
  }
  handleClickCard = (id) => {
    document.querySelector('.poke-details').classList.add('active');
    document.querySelector('.home').classList.remove('active');
    document.querySelector('.search').classList.remove('active');
    const pokeRef = { ...this.state.collection[id] }
    this.setState({
      pokeFullDetails: pokeRef,
    })
  }
  componentDidMount() {
    this.pokeRandom();
    setInterval(this.pokeRandom, 30000);
  }

  render() {
    return (
      <div className="container">
        <div className="app">
          <Header />
          <NavBar />
          <div className="body">
            <Switch>
              <Route
                exact path="/"
                render={props => <Home {...props}
                  didYouKnow={this.state.didYouKnow}
                  vevo={this.state.vevo}
                />}
              />
              <Route
                path={process.env.PUBLIC_URL + '/Search'}
                render={props => <Search {...props}
                  collection={this.state.collection}
                  checkIfIHaveIt={this.checkIfIHaveIt}
                  hidePokemon={this.hidePokemon}
                  hideDeck={this.hideDeck}
                  handleClickCard={this.handleClickCard}
                />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/PokeDetails"}
                render={props => <PokeDetails {...props}
                  pokeFullDetails={this.state.pokeFullDetails}
                  getImgEvolutionChain={this.getImgEvolutionChain}
                />}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

