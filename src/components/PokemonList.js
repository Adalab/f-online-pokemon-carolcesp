import React, {Component} from "react";

class PokemonList extends Component {
  
  render() {
   const {results} = this.props
      return (
        <div className="main__list">
          <ul className="poke__list">
            {results.map(item => {
              return (
                <li key={item.pokeId} className="poke__list--item">
                  <div className="list__item--image">
                    <img src={item.pokeImg} alt={item.pokeName} className="item__image" />
                  </div>
                  <div className="list__item--id">
                    <h3 className="item__id">ID / {item.pokeId}</h3>
                  </div>
                  <div className="list__item--name">
                    <h2 className="item__name">{item.pokeName}</h2>
                  </div>
                  <div className="list__item--types">
                    {item.type.map((type, index) => {
                      return (
                          <span key={index} className="item__types">{type}</span>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };
  };
  


export default PokemonList;