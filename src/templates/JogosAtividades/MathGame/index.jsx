import React from 'react';
import './styles.css';
import Game from './Game';

function MathGame() {
    return (
        <div className="container-math-game">
            <div className="box-math-game">
                <h1 className='title'>Math Sprint Game</h1>
                <Game />
            </div>
        </div>
    );
}

export default MathGame;
