import React from 'react';
import './Card.css'

const Card = ({ suit, pointValue }) => {

  return (
    <div className={ `card ${suit}` }>
      <h1 className={ 'pointValue top' }>{ pointValue.toUpperCase() || '' }</h1>
      <h1 className={ 'suit' }>{ suit.toUpperCase() }</h1>
      <h1 className={ 'pointValue bottom' }>{ pointValue.toUpperCase() || '' }</h1>
    </div>
  );
};

export default Card;
