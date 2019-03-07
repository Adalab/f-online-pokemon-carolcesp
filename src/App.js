import React, { Component } from 'react';
import { getApiPokemon } from './services/PokeServices';
import PokemonList from './components/PokemonList';
import FilterNamePoke from './components/FilterNamePoke';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokeName: [],
      pokeInfo:{},
      fieldName: ''
    }
 
    this.getFieldName = this.getFieldName.bind(this);
  }

  componentDidMount(){
    this.getPokemon();
  }

  getPokemon() {
    getApiPokemon()
    .then(pokeName => {
      console.log('punto1',pokeName)
      const results = pokeName.results;
      results.forEach(pokeUrl => {
        fetch(pokeUrl.url)
          .then(response => response.json())
          .then(pokeInfo => {
            const resultInfo = pokeUrl.items
            console.log('punto2',pokeInfo)
            this.setState({
              pokeName: results,
              pokeInfo: resultInfo
          })
          this.saveLocalStorage(this.state.pokeName,'pokeName');
        })
      });
    })
  }

  saveLocalStorage(poke, pokeName){
    localStorage.setItem(pokeName,JSON.stringify(poke))
  }
  
  getSavedLocalStorage(){
    if(localStorage.getItem('pokeName') !== null){
      const myPokemon = JSON.parse(localStorage.getItem('pokeName'));
      this.setState({
        pokeName: myPokemon,
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
    const filterName = this.state.pokeName
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
