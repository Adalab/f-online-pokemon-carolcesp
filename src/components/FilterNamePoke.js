import React, {Component} from "react";

class FilterNamePoke extends Component {
  
  render() {
    const {name} = this.props;
      return (
        <section className="main__filter">
          <label htmlFor="pokename">
              <input onKeyUp={name} type="text" id="pokename" name="pokename" placeholder="Busca a tu pokemon favorito" className="poke__filter" ></input>
            </label>
        </section>
      );
    };
  };
  


export default FilterNamePoke;