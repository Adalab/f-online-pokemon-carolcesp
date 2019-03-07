import React, {Component} from "react";

class PokemonList extends Component {
  
  render() {
    const {filterResult} = this.props;
      return (
        <div className="main__list">
          <ul className="list__pokemon">
              {filterResult.map((item,key)=>{
                return(
                  <li className="poke__list--item" key={key}>
                     
                      <div>
                        <h2 className="poke__list--name" >{item.name}</h2>
                      </div>
                  </li>
              )
            })}  
            </ul>
        </div>
      );
    };
  };
  


export default PokemonList;