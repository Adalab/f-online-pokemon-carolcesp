import React, {Component} from "react";
import PropTypes from "prop-types";

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
FilterNamePoke.propType ={
  name: PropTypes.func.isRequired
};


export default FilterNamePoke;