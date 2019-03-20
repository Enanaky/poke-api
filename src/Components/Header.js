import React, { Component } from 'react';


class Header extends Component {
  render() {
    const logo = require('../images/logo.png');

    return(
      <div className="header"> 
        <img className="poke-logo" src={logo} alt="poke-logo"></img>
      </div>
    );
  }
}
export default Header;