import React, { useState, useEffect } from 'react';
import PlayerHand from '../PlayerHand/PlayerHand'
import DealerHand from '../DealerHand/DealerHand'
import Game from '../Game/Game'
import './App.css';


const App = () => {


  return (
    <main className="game-board">
      <Game />
    </main>
  );
}

export default App;

// need a computer hand and a player hand
// players cards are both face up at the beginning of the game
// dealer only shows one card at the beginning
// player hits until blackjack, busting, or standing
// computer will go on hitting until the score is higher than they players
// if it isn't a bust computer wins
