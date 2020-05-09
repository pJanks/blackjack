import React, { useState } from 'react';
import PlayerHand from '../PlayerHand/PlayerHand'
import DealerHand from '../DealerHand/DealerHand'
import './App.css';

const suits = ['D', 'S', 'H', 'C']
const types = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']
const deck = []
let counter = 2



suits.forEach(suit => {
  types.forEach(type => {
    deck.push(`${suit}${type}`)
  })
})

for (let i = deck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [deck[i], deck[j]] = [deck[j], deck[i]];
}

const App = () => {
  const [dealerHand, setDealerHand] = useState([deck[0], deck[1]])
  const [playerHand, setPlayerHand] = useState([deck[11], deck[12]])
  const handleHitButtonClick = (e) => {
    setPlayerHand([...playerHand, deck[counter]])
    counter ++
  }
  return (
    <main className="game-board">
      <DealerHand cards={ dealerHand } />
      <section>
        <button
        onClick={ (e) => handleHitButtonClick(e) }
        >Hit</button>
        <button>Stand</button>
      </section>
      <PlayerHand cards={ playerHand } />
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
