import React from 'react';
import './Card.css'

const Card = ({ suit, pointValue }) => {
  return (
    <div className='card'>
      <h1> - { suit } - { pointValue } - </h1>
    </div>
  );
};

export default Card;
