import React from 'react';

class DidYouKnowCard extends React.Component {
  render(){
    const { description, images: {default: image}  } = this.props.poke;
    // images: { shiny: image }
    return(
      <section className="DidYouKnowCard">
        <div className="DidYouKnowCard-div">
          <h2 className="DidYouKnowCard-title">¿Did you know...?</h2>
          <p className="DidYouKnowCard-info">{description}</p>
        </div>
        <img className="DidYouKnowCard-img" src={image} alt='img'/>
      </section>
    );
  }
}
export default DidYouKnowCard;