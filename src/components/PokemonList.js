import React, {Component} from "react";

class PokemonList extends Component {
  
  render() {
    const {filterResult} = this.props;
      return (
        <React.Fragment>
          <ul className="poke__list">
              {filterResult.map((item,key)=>{
                return(
                  <li className="poke__list--item" key={key}>
                      <div>
                        <h2 className="poke__list--name" >{item.name}</h2>
                      </div>
                      <div>
                        <p className="poke__list--types">{item.type}</p>
                      </div>
                  </li>
              )
            })}  
            </ul>
        </React.Fragment>
      );
    };
  };
  


export default PokemonList;