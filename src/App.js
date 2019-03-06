import React, { Component } from 'react';
import { getApipokemon } from './services/pokeServices';
import PokemonList from './components/PokemonList';
import FilterNamePoke from './components/FilterNamePoke';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokedex: [],
      fieldName: ''
    }
 
    this.getPokemon = this.getPokemon.bind(this);
    this.getFieldName = this.getFieldName.bind(this);
  }

  componentDidMount(){
    this.getSavedLocalStorage();
  }

  getPokemon() {
    getApipokemon()
    .then(data => {
      const results = data.results;
      this.setState({
        pokedex: results,
      });
      this.saveLocalStorage(this.state.pokedex,'pokedex');
    })
  }

  saveLocalStorage(poke, pokeName){
    localStorage.setItem(pokeName,JSON.stringify(poke))
  }
  
  getSavedLocalStorage(){
    if(localStorage.getItem('pokedex') !== null){
      const myPokemon = JSON.parse(localStorage.getItem('pokedex'));
      this.setState({
        pokedex: myPokemon,
      })
    } else {
      this.getPokemon();
    }
  }

  getFieldName(e){
    const fieldNamePoke = e.currentTarget.value;
     this.setState({
       fieldName: fieldNamePoke 
     });
  };

  filterPokemon(){
    const filterName = this.state.pokedex
      .filter(item => {
      const name = item.name;
      return (name.toUpperCase().includes(this.state.fieldName.toUpperCase())) ? true : false;
     })
    return filterName;
  };


  render() {
    const filterResult = this.filterPokemon();
    return (
      <div className="page__wrapper">
        <header className="header__content">
          <h1 className="header__title">POKEDEX</h1>
        </header>
        <main className="main__content">
          <FilterNamePoke name={this.getFieldName}/>
          <PokemonList filterResult={filterResult} />
        </main>
      </div>
    );
  }
}

export default App;
