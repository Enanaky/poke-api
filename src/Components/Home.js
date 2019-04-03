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
		const pikachu420 = require('../images/pikachu420.jpg');
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
						{/* <img className="pikachu420" src={pikachu420} alt="fondaso"></img> */}
					</div>
				);
		}else{
			return '';
		}
	}
}
export default Home;