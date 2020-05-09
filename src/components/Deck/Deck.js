import React, { useState } from 'react'

const suits = ['d', 's', 'h', 'c']
const types = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const pairedCards = []

const Deck = () => {
  suits.forEach(suit => {
    types.forEach(type => {
      pairedCards.push(`${suit}${type}`)
    })
  })
  for (let i = pairedCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairedCards[i], pairedCards[j]] = [pairedCards[j], pairedCards[i]];
    }
    console.log(pairedCards);
  return(
    <h1>Hello</h1>
  )
}

export default Deck
