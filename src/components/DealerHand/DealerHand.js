import React from 'react';
import Card from '../Card/Card';

const DealerHand = ({ cards, gameOver }) => {
  if (cards.length === 1) {
    cards = ['', cards[0]]
  }
  return cards.map(card => {
    return (
      <div key={ card } className='all-cards'>
        <Card suit={card.split('')[0] || ''} pointValue={card.split('')[1] || ''} />
      </div>
    );
  });
};

// <Card suit={ '' } pointValue={ '' } className='card' />
export default DealerHand;
