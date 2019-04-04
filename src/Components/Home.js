import React from 'react';
import DidYouKnowCard from './didYouKnowCard';

class Home extends React.Component {
	
	didYouKnowMaker = function(firstInfo) {
		const data = [];
		firstInfo.forEach(item => {
			data.push(
				<DidYouKnowCard 
					poke={item}
					key={item.id}
				/>
			);
		});
		return data;
	}
	render() {
		const logo = require('../images/logo.png');

		const gitLogo = require('../images/GitHub-Mark/PNG/GitHub.png');
		const didYouKnow = this.props.didYouKnow;
		if(didYouKnow){
			const firstInfo = Object.values(didYouKnow);
				return (
					<div id="home">
						<h1 className="welcome">
							welcome
						</h1>
						<div className="first-info">
							{
								this.didYouKnowMaker(firstInfo)
							}
						</div>
						<div className="thanks">
							<p>Gracias, de verdad, gracias a mi vieja, a mi viejo, a la produccion, al Chato, a Hope, a vos Marcelo, que hiciste esto posible! Gracias a mis fans y a los 3 fumancheros...</p>
							<a href="https://github.com/Enanaky/poke-api" target="_blank"><img id="github-logo" src={gitLogo} alt="github"/></a>	
						</div>
					</div>
				);
		}else{
			return '';
		}
	}
}
export default Home;