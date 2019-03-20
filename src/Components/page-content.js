import React from 'React';
import { Switch, Route } from 'react-router-dom';

import PokeCollection from './PokeCollection';
import FullSpecs from './FullSpecs';

export default function() {
	return(
		<div>
			<Switch>
				<Route exact path="/" component={PokeCollection} />
				<Route exact path="/FullSpecs" component={FullSpecs} />
			</Switch>
		</div>
	);
}