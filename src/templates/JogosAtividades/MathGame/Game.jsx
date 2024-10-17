import React, { useState } from 'react';
import './styles.css';
import Timer from './Timer'
import Question from './Question'

const Game = () => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleAnswer = (isCorrect) => {
      if (isCorrect) {
        setScore(score + 1);
      }
    };

    const handleTimeOver = () => {
      setGameOver(true);
    };

    const restartGame = () => {
      setScore(0);
      setGameOver(false);
    };

    return (
        <div>
          {!gameOver ? (
              <>
                <Timer onTimeOver={handleTimeOver} />
                <Question onAnswer={handleAnswer}
                    timeOver={gameOver} />
                <p className='text'>Score: {score}</p>
              </>
          ) : (
              <>
                <p className='text'>Time's up! Your final score is {score}.</p>
                <button className='btn' onClick={restartGame}>
                    Restart Game
                </button>
              </>
          )}
        </div>
    );
};

export default Game;
