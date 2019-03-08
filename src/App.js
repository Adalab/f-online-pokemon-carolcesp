import React, { Component } from 'react';
import { getApiPokemon } from './services/PokeServices';
import PokemonList from './components/PokemonList';
import FilterNamePoke from './components/FilterNamePoke';
import './App.css';

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

  getPokemon() {
    getApiPokemon()
    .then(poke => {
      console.log('punto1',poke)

//realizo map de results para acceder a la url que devuelve la Api
      const pokeUrl = poke.results.map(item => {
          return item.url
      });
      for (let i = 0; i < pokeUrl.length; i++){
        fetch(pokeUrl[i])
          .then(response => response.json())
          .then(pokeInfo => {

            console.log('punto2',pokeInfo)

  //creo array para ir metiendo los tipos una vez recorrido
            const pokeType = []; 
              for (let i = 0; i < pokeInfo.types.length; i++) {
                pokeType.push(pokeInfo.types[i].type["name"]);
              }
  //en mi obj poke meto las propiedades que necesito
            const poke = {
              pokeName: pokeInfo.name,
              pokeId: pokeInfo.id,
              pokeImg: pokeInfo.sprites.front_default,
              type: pokeType
            };
            console.log('Que devuelve poke?? >',poke)
  //constante que accede a myPokemon y mete las propiedad de la constante anterior poke!
            const resultInfo = this.state.myPokemon;
            resultInfo.push(poke);
            this.setState({
              myPokemon: resultInfo
          });
          this.saveLocalStorage(this.state.myPokemon,'myPokemon');
        })
      }
    })
  }

  saveLocalStorage(poke, myPokemon){
    localStorage.setItem(myPokemon,JSON.stringify(poke))
  }
  
  getSavedLocalStorage(){
    if(localStorage.getItem('myPokemon') !== null){
      const savePokemon = JSON.parse(localStorage.getItem('myPokemon'));
      this.setState({
        myPokemon: savePokemon,
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
    const filterName = this.state.myPokemon
      .filter(item => {
      const name = item.pokeName;
      return (name.toUpperCase().includes(this.state.fieldName.toUpperCase())) ? true : false;
     })
    return filterName;
  };


  render() {
   
    const {myPokemon} = this.state;
    return (
      <div className="page__wrapper">
        <header className="header__content">
          <h1 className="header__title">POKEDEX</h1>
        </header>
        <main className="main__content">
          <FilterNamePoke name={this.getFieldName}/>
          <PokemonList results={myPokemon} /> 
        </main>
      </div>
    );
  }
}

export default App;
