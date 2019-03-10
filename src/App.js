import React, { Component } from 'react';
import {getApiPokemon} from './services/pokeServices';
import PokemonList from './components/PokemonList';
import FilterNamePoke from './components/FilterNamePoke';
import './App.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      myPokemon: [],
      fieldName: ''
    }
    this.getFieldName = this.getFieldName.bind(this);
  }

  componentDidMount(){
    this.getPokemon();
  }

  saveLocalStorage(idNumber, myPokemon){
    localStorage.setItem(myPokemon,JSON.stringify(idNumber))
  }
  
  getSavedLocalStorage(){
    if(localStorage.getItem('poke') !== null){
      const savePokemon = JSON.parse(localStorage.getItem('poke'));
      this.setState({
        myPokemon: savePokemon,
      })
    } else {
      this.getPokemon();
    }
  }

  getPokemon() {
    getApiPokemon()
    .then(poke => {
      const addId = poke.results.map((item,index) => {
        return {...item,id:index}
      });
      const pokeUrl = addId.map(item => {
        return item.url
      });
      
      for (let i = 0; i < pokeUrl.length; i++){
        fetch(pokeUrl[i])
          .then(response => response.json())
          .then(pokeUrl => { 
            const pokeType = []; 
              for (let i = 0; i < pokeUrl.types.length; i++) {
                pokeType.push(pokeUrl.types[i].type.name);
              }
            let poke = {
              pokeName: pokeUrl.name,
              pokeId:pokeUrl.id,
              pokeImg: pokeUrl.sprites.front_default,
              type: pokeType
            };
            const resultInfo = this.state.myPokemon;
            resultInfo.push(poke);
            this.setState({
              myPokemon: resultInfo.sort(((a, b) => a.pokeId - b.pokeId))
          });
          this.saveLocalStorage(this.state.myPokemon,'myPokemon');
        })
      }
    })
  }

  getFieldName(e){
    const fieldNamePoke = e.currentTarget.value;
     this.setState({
       fieldName: fieldNamePoke 
     });
  };

  filterPokemon(){
    const filterName = this.state.myPokemon
      .filter(item => {
      const name = item.pokeName;
      return (name.toUpperCase().includes(this.state.fieldName.toUpperCase())) ? true : false;
    })
    return filterName;
  };

  render() {
    const filterPoke = this.filterPokemon();
    return (
      <div className="page__wrapper">
        <div className="shapes__content">
          <div className="triangle__left"></div>
          <div className="triangle__righ"></div>
        </div>
        <header className="header__content">
          <h1 className="header__title">POKEDEX</h1>
        </header>
        <main className="main__content">
          <FilterNamePoke name={this.getFieldName}/>
          <PokemonList filterPoke={filterPoke}/> 
        </main>
        <footer>
        <div className="shapes__content">
          <div className="circle__left"></div>
          <div className="circle__righ"></div>
        </div>
        </footer>
      </div>
    );
  }
}

export default App;
