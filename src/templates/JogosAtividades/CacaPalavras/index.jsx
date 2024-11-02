import React, { useState, useEffect } from "react";
import "./styles.css";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { WordPuzzleComponent } from "./components/WordPuzzleComponent";

export const CacaPalavras = () => {
  const answerWords = [
    "gato",
    "macaco",
    "formiga",
    "cavalo",
    "vaca",
    "pato",
    "elefante",
    "girafa",
    "arara",
  ];

  const generateWordPuzzle = (words, rows = 10, columns = 10) => {
    const matrix = Array.from({ length: rows }, () => Array(columns).fill(""));

    const directions = [
      { name: "horizontal", dx: 1, dy: 0 },
      { name: "vertical", dx: 0, dy: 1 },
    ];

    const canPlaceWord = (word, row, col, dx, dy) => {
      for (let i = 0; i < word.length; i++) {
        const newRow = row + i * dy;
        const newCol = col + i * dx;

        if (
          newRow < 0 ||
          newRow >= rows ||
          newCol < 0 ||
          newCol >= columns ||
          (matrix[newRow][newCol] !== "" && matrix[newRow][newCol] !== word[i])
        ) {
          return false;
        }
      }
      return true;
    };

    const placeWord = (word) => {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * columns);
        const direction =
          directions[Math.floor(Math.random() * directions.length)];

        if (canPlaceWord(word, row, col, direction.dx, direction.dy)) {
          for (let i = 0; i < word.length; i++) {
            const newRow = row + i * direction.dy;
            const newCol = col + i * direction.dx;
            matrix[newRow][newCol] = word[i];
          }
          placed = true;
        }
      }
    };

    words.forEach((word) => placeWord(word));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        if (matrix[row][col] === "") {
          matrix[row][col] = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          ).toLowerCase();
        }
      }
    }

    return matrix;
  };

  const [found, setFound] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [markedLetters, setMarkedLetters] = useState([]);
  const [paths, setPaths] = useState(["left2right", "top2bottom", "right2left", "bottom2top"]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [time, setTime] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const matrix = generateWordPuzzle(answerWords);

  useEffect(() => {
    if (isSelecting) {
      console.log("selected");
    } else {
      console.log("released");
      const selectedWord = selectedLetters.map((x) => x.letter).join("");
      console.log(selectedWord);
      addToFound(selectedWord);
    }

    if (found.length === answerWords.length) {
      stopGame();
      setDialogOpen(true);
    }
  }, [isSelecting, found]);

  const isInList = (searched, arr) => {
    return arr.includes(searched);
  };

  const addToFound = (founded) => {
    if (isInList(founded, answerWords) && !isInList(founded, found)) {
      setFound([...found, founded]);
      console.log(founded);
    }
  };

  const handleRestartGame = () => {
    setIsGameActive(false);
    setFound([]);
    setSelectedLetters([]);
    setMarkedLetters([]);
    setDialogOpen(false);
    startGame();
  };

  const handleEndGame = () => {
    setDialogOpen(false);
    stopGame();
  };

  const startGame = () => {
    setIsGameActive(true);
    setTime(0);
    setFound([]);
    const id = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    setIntervalId(id);
  };

  const stopGame = () => {
    setIsGameActive(false);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className='cacapalavras-game-container'>
      {/* O botão só será visível enquanto o jogo não estiver ativo */}
      {!isGameActive && (
        <button className="start-button" onClick={startGame}>
          Iniciar Jogo
        </button>
      )}
      <div className="timer">Tempo: {formatTime(time)}</div>
      <div className="answer-words-container">
        {answerWords.map((element) => (
          <span key={element} className="answer-word">
            <h2
              className={`answer-text ${
                isInList(element, found) ? "line-through" : ""
              }`}
            >
              {element}
            </h2>
          </span>
        ))}
      </div>
      <div className={`word-puzzle-wrapper ${isGameActive ? "active" : "inactive"}`}>
        <WordPuzzleComponent
          design={{
            markedBackgroundColor: "#00C3FF",
            selectedBackgroundColor: "white",
            hoveredBackgroundColor: "rgb(0, 218, 145)",
            backgroundColor: "rgb(1, 146, 98)",
            fontFamily: "Irish Grover",
            fontWeight: "",
            fontSize: "2.5rem",
            markedForeColor: "white",
            selectedForeColor: "rgb(1, 146, 98)",
            hoveredForeColor: "white",
            foreColor: "white",
          }}
          options={{
            answerWords: answerWords,
            matrix: matrix,
            isGameActive: isGameActive,
            isSelecting: isSelecting,
            selectedLetters: selectedLetters,
            setSelectedLetters: setSelectedLetters,
            markedLetters: markedLetters,
            setMarkedLetters: setMarkedLetters,
            setIsSelecting: setIsSelecting,
            availablePaths: paths,
          }}
        />
      </div>
      <Dialog open={dialogOpen} onClose={handleEndGame}>
        <DialogTitle sx={{fontFamily: 'Irish Grover', fontSize: '25px', textAlign: 'center'}}>Parabéns!</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{fontFamily: 'Coming Soon'}}>
            Você encontrou todas as palavras! Deseja jogar novamente ou finalizar o jogo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestartGame} sx={{backgroundColor: '#00C3FF', color: '#FFF', borderRadius: '10px', fontFamily: 'Irish Grover'}}>Reiniciar Jogo</Button>
          <Button onClick={handleEndGame} sx={{backgroundColor: 'rgb(0, 218, 145)', color: '#FFF', borderRadius: '10px', fontFamily: 'Irish Grover'}}>Finalizar Jogo</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default CacaPalavras;
