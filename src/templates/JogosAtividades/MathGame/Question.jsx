import React, { useState } from 'react';
import './styles.css';

const Question = ({ onAnswer, timeOver }) => {
    const [num1, setNum1] = useState(Math.ceil(Math.random() * 10));
    const [num2, setNum2] = useState(Math.ceil(Math.random() * 10));
    const [operator, setOperator] = useState('+');
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    const generateQuestion = () => {
        setNum1(Math.ceil(Math.random() * 10));
        setNum2(Math.ceil(Math.random() * 10));
        const operators = ['+', '-', '*', '/'];
        const randomOperator = operators[Math.floor(Math.random() * operators.length)];
        setOperator(randomOperator);
        setUserAnswer('');
    };

    const checkAnswer = () => {
        let correctAnswer;
        switch (operator) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                correctAnswer = num1 - num2;
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
            case '/':
                correctAnswer = num1 / num2;
                break;
            default:
                correctAnswer = num1 + num2;
                break;
        }
        if (parseFloat(userAnswer) === correctAnswer) {
            setIsCorrect(true);
            onAnswer(true);
        } else {
            setIsCorrect(false);
            onAnswer(false);
        }
        generateQuestion();
    };

    return (
        <div>
            {timeOver ? (
                <p>Time's up! Game Over</p>
            ) : (
                <>
                    <p className='text'>{num1} {operator} {num2} = </p>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={
                            (e) => setUserAnswer(e.target.value)}
                    />
                    <button className='btn' onClick={checkAnswer}>Submit</button>
                    {isCorrect !== null && (
                        <p>
                            {isCorrect ? 'Correct!' : 'Incorrect!'}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default Question;
