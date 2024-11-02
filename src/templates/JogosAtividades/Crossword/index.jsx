import React from "react";
import Crossword from '@jaredreisinger/react-crossword';
import './CrosswordComponent.css';

const data = {
  across: {
    2: { clue: 'Avestruz', answer: 'AVESTRUZ', row: 0, col: 2, },
    4: { clue: 'Rato', answer: 'RATO', row: 2, col: 6, },
    5: { clue: 'Elefante', answer: 'ELEFANTE', row: 3, col: 0, },
    7: { clue: 'Urubu', answer: 'URUBU', row: 5, col: 5 , },
    9: { clue: 'Girafa', answer: 'GIRAFA', row: 7, col: 6 , },
    11: { clue: 'Foca', answer: 'FOCA', row: 8, col: 3 , },
  },
  down: {
    1: { clue: 'Tartaruga', answer: 'TARTARUGA', row: 0, col: 6, },
    3: { clue: 'Leão', answer: 'LEÃO', row: 3, col: 1, },
    6: { clue: 'Pato', answer: 'PATO', row: 6, col: 11, }
  }
}

export default function CrosswordComponent() {

  return (
    <div className="crossword-container">
      <Crossword
        data={data}
        theme={{ numberColor: 'black', highlightBackground: '#66B2B2' }}
      />
    </div>
  );
}