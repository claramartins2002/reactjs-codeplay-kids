import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { green, red, blue, yellow } from '@mui/material/colors';

// Função para gerar questões de matemática
const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 + num2;
    const wrongAnswer1 = correctAnswer + Math.floor(Math.random() * 3) + 1;
    const wrongAnswer2 = correctAnswer - Math.floor(Math.random() * 3) - 1;

    const answers = [correctAnswer, wrongAnswer1, wrongAnswer2].sort(() => Math.random() - 0.5);

    return {
        question: `${num1} + ${num2} = ?`,
        correctAnswer,
        answers
    };
};

const MathGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [message, setMessage] = useState('');

    const handleAnswer = (answer) => {
        if (answer === currentQuestion.correctAnswer) {
            setScore(score + 1);
            setMessage('Acertou! 🎉');
        } else {
            setErrors(errors + 1);
            setMessage('Errou! 😞');
        }
        setTimeout(() => {
            setMessage('');
            setCurrentQuestion(generateQuestion());
        }, 1000);
    };

    return (
        <Box
            sx={{
                backgroundColor: yellow[50],
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: 3,
            }}
        >
            <Typography variant="h4" sx={{ mb: 2, color: blue[700], fontWeight: 'bold' }}>
                Jogo de Matemática 🎓
            </Typography>
            <Card
                sx={{
                    minWidth: 300,
                    backgroundColor: blue[100],
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    borderRadius: 3,
                }}
            >
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, color: blue[900] }}>
                        {currentQuestion.question}
                    </Typography>
                    <Grid container spacing={2}>
                        {currentQuestion.answers.map((answer, index) => (
                            <Grid item xs={4} key={index}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => handleAnswer(answer)}
                                    sx={{
                                        backgroundColor: answer === currentQuestion.correctAnswer ? green[400] : red[400],
                                        '&:hover': {
                                            backgroundColor: answer === currentQuestion.correctAnswer ? green[600] : red[600],
                                        },
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                                    }}
                                >
                                    {answer}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
            <Typography variant="h6" sx={{ mt: 2, color: green[600] }}>
                {message}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, color: blue[900] }}>
                Pontuação: {score}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, color: red[700] }}>
                Erros: {errors}
            </Typography>
        </Box>
    );
};

export default MathGame;
