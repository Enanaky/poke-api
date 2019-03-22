import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
	return(
		<nav className="nav-bar">
			<ul>				
					<Link className="home" to="/"><li>Home</li></Link>				
					<Link className="search" to="/Search"><li>Search</li></Link>				
					<Link className="poke-details" to="/PokeDetails"><li>Details</li></Link>				
			</ul>
		</nav>
	);
}
 export default NavBar;