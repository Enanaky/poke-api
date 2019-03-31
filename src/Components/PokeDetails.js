import React, { Component } from 'react';

class PokeDetails extends Component {
	
	upperCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}	
	checkHabitat(habitat) {
		if(habitat){
			return <li id="li-habitat">Hábitat: <span>{this.upperCase(habitat.name)}</span></li>;
		}
	}
	checkEggs(egg_groups) {
		if(egg_groups){
			const eggs = egg_groups.map(item => {
				return <li className={item} key={item}>{item}</li>;					
			});
			return <ul className="ul-eggs">{eggs}</ul>;
		}			
	}
	getType(types) {
		if(types){
			const type = types.map(item => {
				return <li className={item} key={item}>{item}</li>;					
			});
			return <ul className="ul-types">{type}</ul>;
		}
	}
	getStats(stats) {
		const allStats = Object.values(stats);
		if(allStats){
			stats = (
				<div className="div-stats">
					<ul className="ul-a">
						<li>Speed: <span className="speed">{allStats[0]}</span></li>
						<li>Attack: <span className="attack">{allStats[4]}</span></li>
						<li>S.Attack: <span className="special-attack">{allStats[2]}</span></li>
					</ul>
					<ul className="ul-d">
						<li>Hp: <span className="hp">{allStats[5]}</span></li>
						<li>Defense: <span className="defense">{allStats[3]}</span></li>
						<li>S.Defense: <span className="special-defense">{allStats[1]}</span></li>
					</ul>
				</div>
			);
			return stats;
		}				
		return ;
	}

	render() {
		const { pokeFullDetails } = this.props;
		// console.log('pokemon: ', pokeFullDetails);
		
		if(pokeFullDetails){
			const { name, id, color, weight, height, generation, genera, habitat, images: { default: image }, description, egg_groups, types, stats } = pokeFullDetails;
			return(
				<div className="full-details">
					<div className="detail-name">{this.upperCase(name)}</div>
					<section className="img-data">
						<img className="detail-img" src={image} alt="detail-img"></img>
						<ul className="detail-data">
							<li id="li-number"> Number: <span>{id}</span></li>
							<li id="li-color"> Color: <span>{this.upperCase(color)}</span></li>
							<li id="li-height"> Height: <span>{height}</span></li>
							<li id="li-weight"> Weight: <span>{weight}</span></li>
							<li id="li-genera"> Genera: <span>{genera}</span></li>
							{this.checkHabitat(habitat)}
							<li id="li-generation">Generation: <span>{this.upperCase(generation)}</span></li>		
						</ul>
					</section>
					<p className="description">{description}</p>
					<section className="type-eggGroups">
						<div className="div-eggs">
							<p>Eggs group</p>
							{this.checkEggs(egg_groups)}
						</div>
						<div className="div-types">
						<p>Type</p>
							{this.getType(types)}
						</div>
					</section>
					<section className="section-stats">
							{this.getStats(stats)}
					</section>
				</div>
			);
		}else{
			return '';
		}		
	}
}
export default PokeDetails;