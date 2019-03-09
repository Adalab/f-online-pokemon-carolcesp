import React, {Component} from "react";
import PropTypes from 'prop-types';

class PokemonList extends Component {
  
  render() {
   const {filterPoke} = this.props
      return (
        <section className="main__list">
          <ul className="poke__list">
            {filterPoke.map((item,key) => {
              return (
                <li key={key} className="poke__list--item">
                  <div className="item__image">
                    <img src={item.pokeImg} alt={item.pokeName} className="image__style" />
                    <p className="id__text">ID / {item.pokeId}</p>
                  </div>
                  <div className="item__name">
                    <h2 className="name__title">{item.pokeName}</h2>
                  </div>
                  <div className="item__types">
                    {item.type.map((type, index) => {
                      return (
                          <p key={index} className="types__text">{type}</p>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      );
    };
  };
  PokemonList.propTypes = {
    filterPokemons: PropTypes.array
}


export default PokemonList;