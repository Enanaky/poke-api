import React from 'react';
import { Link } from 'react-router-dom';

function handleClickEvent(e) {
  document.querySelector('.home').classList.add('active');
}

function Header() {
  const logo = require('../images/logo.png');

  return (
    <div className="header">
      <Link to={process.env.PUBLIC_URL + '/'} onClick={(e) => handleClickEvent(e)} className="poke-logo-a">
        <img className="poke-logo" src={logo} alt="poke-logo"></img>
      </Link>
    </div>
  );

}
export default Header;