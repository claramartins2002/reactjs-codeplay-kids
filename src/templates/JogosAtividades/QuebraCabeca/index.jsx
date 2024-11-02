import React, { useState } from 'react';
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import img from './images/teste.jpg';
import ConfettiExplosion from 'react-confetti-explosion';
import './QuebraCabeca.css';

function PuzzleGame() {
  const [isExploding, setIsExploding] = useState(false);

  const onComplete = () => {
    setIsExploding(true);
    console.log('Puzzle is completed!');
    // Reseta a explosão após 3 segundos
    setTimeout(() => {
      setIsExploding(false);
    }, 3000);
  };

  return (
    <div className="game">
      <JigsawPuzzle
        imageSrc={img}
        rows={2}
        columns={2}
        onSolved={onComplete}
      />
      {isExploding && <ConfettiExplosion
          force={0.8}
          duration={3000}
          particleCount={250}
          width={3600}
        />
      }
    </div>
  );
}

export default PuzzleGame;
