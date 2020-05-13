import React from 'react';
import Card from '../Card/Card';
import './PlayerHand.css'

const PlayerHand = ({ cards }) => {
  return cards.map(card => {
    return (
      <div key={ card } className='all-cards'>
        <Card suit={card.split('')[0]} pointValue={card.split('')[1]} />
      </div>
    );
  });
};

export default PlayerHand;
