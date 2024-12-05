import React, { useState } from 'react';
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import useWindowSize from 'react-use/lib/useWindowSize'
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import Confetti from 'react-confetti';
import './QuebraCabeca.css';
import Timer from '../Timer';

function PuzzleGame() {
  const [isExploding, setIsExploding] = useState(false);
  const [isRunning, setIsRunning] = useState(false);  // Controle do tempo
  const [isStarted, setIsStarted] = useState(false);  // Controle do início do jogo

  const startPuzzle = () => {
    setIsStarted(true);
    setIsRunning(true);  // Inicia o timer
  };

  const onComplete = () => {
    setIsExploding(true);
    setIsRunning(false);  // Para o cronômetro
    console.log('Puzzle is completed!');

    // Reseta a explosão após 3 segundos
    setTimeout(() => {
      setIsExploding(false);
    }, 3000);
  };

  const handleTimeComplete = (timeElapsed) => {
    console.log(`Tempo decorrido: ${timeElapsed} segundos`);
  };

  const { width, height } = useWindowSize()

  return (
    <div className="game">
      {!isStarted ? (
        <button onClick={startPuzzle}>Iniciar Quebra-Cabeça</button>
      ) : (
        <>
          <Timer isRunning={isRunning} onComplete={handleTimeComplete} />
          <JigsawPuzzle
            imageSrc='https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000033131/dbc8c55a21688b446a5c57711b726956483a14ef8c5ddb861f897c0595ccb6b5'
            rows={2}
            columns={2}
            onSolved={onComplete}
          />
        </>
      )}
      {isExploding && 
        <Confetti 
          width={width}
          height={height}
          numberOfPieces={800}
          gravity={0.3}
          wind={0.01} 
          friction={0.99}
        />
      }
    </div>
  );
}

export default PuzzleGame;
