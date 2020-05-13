import React from 'react';
import Card from '../Card/Card';

const DealerHand = ({ cards }) => {
  return cards.map(card => {
    return (
      <div key={ card } className='all-cards'>
        <Card suit={card.split('')[0]} pointValue={card.split('')[1]} />
      </div>
    );
  });
};

export default DealerHand;
