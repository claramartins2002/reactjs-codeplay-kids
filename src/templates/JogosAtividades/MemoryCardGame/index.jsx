import React, { useEffect, useState } from 'react';
import './style.css';
import img1 from './images/img-1.png'
import img2 from './images/img-2.png'
import img3 from './images/img-3.png'
import img4 from './images/img-4.png'
import img5 from './images/img-5.png'
import img6 from './images/img-6.png'
import SingleCard from './components/SingleCard';

const cardImages = [
  { 'src': img1, matched: false },
  { 'src': img2, matched: false },
  { 'src': img3, matched: false },
  { 'src': img4, matched: false },
  { 'src': img5, matched: false },
  { 'src': img6, matched: false }
];

const MemoryCardGame = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])  

  return (
    <div className="memory-game">
      <div className="header">
        <h1>Jogo da memória</h1>
        <button className="btn-memory-game" onClick={shuffleCards}>New Game</button>
      </div>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default MemoryCardGame;
