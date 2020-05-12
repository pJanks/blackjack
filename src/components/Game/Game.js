import React, { Component } from 'react';
import PlayerHand from '../PlayerHand/PlayerHand'
import DealerHand from '../DealerHand/DealerHand'

const suits = ['d', 's', 'h', 'c']
const types = ['a', '2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k']
const deck = []
const scores = {
  'a': 11 || 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  't': 10,
  'j': 10,
  'q': 10,
  'k': 10


}

suits.forEach(suit => {
  types.forEach(type => {
    deck.push(`${suit}${type}`)
  })
})

for (let i = deck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [deck[i], deck[j]] = [deck[j], deck[i]];
}

let playerScore = scores[deck[11].split('')[1]] + scores[deck[12].split('')[1]];
let dealerScore = scores[deck[0].split('')[1]] + scores[deck[1].split('')[1]]
let playerCounter = 13
let dealerCounter = 2

class Game extends Component {
  constructor() {
    super()
    this.state = {
      playerHand: [deck[11], deck[12]],
      dealerHand: [deck[0], deck[1]],
      playerScore: scores[deck[11].split('')[1]] + scores[deck[12].split('')[1]],
      dealerScore: scores[deck[0].split('')[1]] + scores[deck[1].split('')[1]],
      endGameMessage: '',

    }
  }

  handleHitButtonClick = () => {
    this.setState({ playerHand: [...this.state.playerHand, deck[playerCounter]] })
    this.setState({ playerScore: this.state.playerScore += scores[deck[playerCounter].split('')[1]] })
    playerCounter++
    console.log(this.state);
  }

  updateScore = (newHand) => {
      console.log(newHand);
      playerCounter ++
      playerScore = 0
      newHand.forEach(card => {
        playerScore += scores[card.split('')[1]]
      })
    }

    updateMessage = () => {
      if (this.state.endGameMessage) {
        return
      }
      if (this.state.playerScore === 21 && this.state.dealerScore !== 21) {
        this.setState({ endGameMessage: <h1>BLACKJACK ! ! !</h1> })
      }
      if (this.state.playerScore !== 21 && this.state.dealerScore === 21) {
        this.setState({ endGameMessage: <h1>YOU SUCK ! ! !</h1> })
      }
    }

    calculateDealersHand = () => {
      while (this.state.dealerScore < 17) {
        this.setState({ dealerHand: [...this.state.dealerHand, deck[dealerCounter]] })
        this.setState({ dealerScore: this.state.dealerScore += scores[deck[dealerCounter].split('')[1]] })
        dealerCounter++
      }
    }

    handleStandButtonClick = () => {
      this.calculateDealersHand()
      if (this.state.endGameMessage) {
        return
      }if (this.state.playerScore < this.state.dealerScore && this.state.dealerScore < 21) {
        this.setState({ endGameMessage: <h1>YOU WIN ! ! !</h1> })
      }
      if (this.state.playerScore > this.state.dealerScore && this.state.playerScore < 21) {
        this.setState({ endGameMessage: <h1>YOU WIN ! ! !</h1> })
      }
      if (this.state.playerScore < this.state.dealerScore && this.state.dealerScore < 21) {
        this.setState({ endGameMessage: <h1>YOU SUCK ! ! !</h1> })
      }

    }



  render = () => {
    this.updateMessage()
    return (
      <main className="game-board">
      { this.state.endGameMessage }
        <DealerHand cards={ this.state.dealerHand } />
        <section>
          <div>{ this.state.dealerScore }</div>
          <button
            onClick={ this.handleHitButtonClick }
          >Hit</button>
          <button
            onClick={ this.handleStandButtonClick }
          >Stand</button>
          <div>{ this.state.playerScore }</div>
        </section>
        <PlayerHand cards={ this.state.playerHand } />
      </main>
    )
  }
};


export default Game;

// need a computer hand and a player hand
// players cards are both face up at the beginning of the game
// dealer only shows one card at the beginning
// player hits until blackjack, busting, or standing
// computer will go on hitting until the score is higher than they players
// if it isn't a bust computer wins
