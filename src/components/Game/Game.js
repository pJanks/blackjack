import React, { Component } from 'react';
import PlayerHand from '../PlayerHand/PlayerHand'
import DealerHand from '../DealerHand/DealerHand'
import './Game.css'

const suits = ['d', 's', 'h', 'c'];
const types = ['a', '2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k'];
const deck = [];
let playerCounter = 13;
let dealerCounter = 2;
const scores = {
  'a': 11,
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
};

suits.forEach(suit => {
  types.forEach(type => {
    deck.push(`${suit}${type}`)
  })
})

for (let i = deck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [deck[i], deck[j]] = [deck[j], deck[i]];
}

class Game extends Component {
  constructor() {
    super()
    this.state = {
      playerHand: [deck[11], deck[12]],
      dealerHand: [deck[0]],
      playerScore: scores[deck[11].split('')[1]] + scores[deck[12].split('')[1]],
      dealerScore: scores[deck[0].split('')[1]],
      endGameMessage: '',
    }
  }

  handleHitButtonClick = () => {
    if (this.state.endGameMessage) {
      return
    }

    if (this.state.playerScore > 10) {
      scores.a = 1
    }

    let playerScore = this.state.playerScore
    this.setState({ playerHand: [...this.state.playerHand, deck[playerCounter]] })
    this.setState({ playerScore: playerScore += scores[deck[playerCounter].split('')[1]] })
    playerCounter++
  }

  handleStandButtonClick = async () => {
    if (this.state.endGameMessage) {
      return
    }

    await this.calculateDealersHand()

    if (this.state.playerScore === this.state.dealerScore && this.state.playerScore < 22){
      this.setState({ endGameMessage: <h1>PUSH ! ! !</h1> })
    }

    if (this.state.playerScore < 21 && this.state.dealerScore > 21) {
      this.setState({ endGameMessage: <h1>YOU WIN ! ! !</h1> })
    }

    if (this.state.playerScore < this.state.dealerScore && this.state.dealerScore < 21) {
      this.setState({ endGameMessage: <h1>YOU LOSE ! ! !</h1> })
    }

    if (this.state.playerScore > this.state.dealerScore && this.state.playerScore < 21) {
      this.setState({ endGameMessage: <h1>YOU WIN ! ! !</h1> })
    }
  }

  calculateDealersHand = async () => {
    scores.a = 11
    await this.setState({ dealerHand: [deck[0], deck[1]] })
    await this.setState({ dealerScore: scores[deck[0].split('')[1]] + scores[deck[1].split('')[1]] })
    while (this.state.dealerScore < 17) {

      if (this.state.dealerScore > 10) {
        scores.a = 1
      }
      await this.setState({ dealerHand: [...this.state.dealerHand, deck[dealerCounter]] })
      await this.setState({ dealerScore: this.state.dealerScore += scores[deck[dealerCounter].split('')[1]] })
      dealerCounter++
    }

    if (this.state.dealerScore > 21) {
      scores.a = 1
      await this.setState({ dealerScore: 0 })
      await this.state.dealerHand.forEach(score => {
         this.setState({ dealerScore: this.state.dealerScore += scores[score.split('')[1]] })
      })
    }
  }

  updateEndGameMessage = () => {
    if (this.state.endGameMessage) {
      return
    }

    if (this.state.playerScore > 21) {
      this.setState({ endGameMessage: <h1>YOU LOSE ! ! !</h1> })
    }

    if (this.state.playerScore === 21 && this.state.dealerScore !== 21) {
      this.setState({ endGameMessage: <h1>BLACKJACK ! ! !</h1> })
    }

    if (this.state.playerScore !== 21 && this.state.dealerScore === 21) {
      this.setState({ endGameMessage: <h1>YOU LOSE ! ! !</h1> })
    }
  }

  render = () => {
    this.updateEndGameMessage()
    if (this.state.playerHand[0].split('')[1] === 'a' && this.state.playerHand[1].split('')[1] === 'a') {
      this.setState({ playerScore: 12 })
      scores.a = 1;
    }
    return (
      <main className="game-board">
      { this.state.endGameMessage }
        <div className='hand'>
          <DealerHand cards={ this.state.dealerHand } />
        </div>
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
        <div className='hand'>
          <PlayerHand cards={ this.state.playerHand } />
        </div>
      </main>
    )
  }
};

export default Game;
