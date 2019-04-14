import React from 'react';
import { Link } from 'react-router-dom';

function handleClickEvent(e) {
	const home = document.querySelector('.home');
	const search = document.querySelector('.search');
	const details = document.querySelector('.poke-details');
	const navBar = [home, search, details];

	navBar.forEach(item => {
		if (item === e.currentTarget) {
			item.classList.add('active');
		} else {
			item.classList.remove('active');
		}
	});
}

function NavBar() {
	return (
		<nav className="nav-bar">
			<ul>
				<Link className="home" onClick={(e) => handleClickEvent(e)} to={process.env.PUBLIC_URL + '/'}><li>Home</li></Link>
				<Link className="search" onClick={(e) => handleClickEvent(e)} to={process.env.PUBLIC_URL + '/Search'}><li>Search</li></Link>
				<Link className="poke-details" onClick={(e) => handleClickEvent(e)} to={process.env.PUBLIC_URL + '/PokeDetails'}><li>Details</li></Link>
			</ul>
		</nav>
	);
}
export default NavBar;