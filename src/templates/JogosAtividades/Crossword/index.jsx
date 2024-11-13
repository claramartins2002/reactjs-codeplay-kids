import { useState, useEffect, useRef } from 'react';
import { CrosswordProvider, CrosswordGrid, DirectionClues, ThemeProvider } from '@jaredreisinger/react-crossword';
import './CrosswordComponent.css';
import { gerarLayoutCrossword } from './utils';

const theme = {
  gridBackground: '#8BC34A',
  cellBackground: '#ffffff',
  cellBorder: '#66B2B2',
  textColor: '#333',
  numberColor: '#333',
  focusBackground: '#FFC107',
  highlightBackground: '#A5D6A7',
};

export default function CrosswordComponent() {
  const crosswordRef = useRef(null);
  const [isSolved, setIsSolved] = useState(false);
  const [crosswordData, setCrosswordData] = useState({ across: {}, down: {} });

  useEffect(() => {
    // Mock dos dados da API para testes
    const mockData = [
      { palavra: 'gato', url: 'https://cdn-icons-png.freepik.com/128/8466/8466905.png' },
      { palavra: 'porco', url: 'https://cdn-icons-png.freepik.com/128/9466/9466821.png' },
      { palavra: 'cavalo', url: 'https://cdn-icons-png.freepik.com/128/8493/8493186.png' },
      { palavra: 'cobra', url: 'https://cdn-icons-png.freepik.com/128/8493/8493095.png' },
      { palavra: 'ovelha', url: 'https://cdn-icons-png.freepik.com/128/8493/8493053.png' },
      { palavra: 'galinha', url: 'https://cdn-icons-png.freepik.com/128/8493/8493102.png' },
      { palavra: 'vaca', url: 'https://cdn-icons-png.freepik.com/128/9466/9466826.png' },
      { palavra: 'pato', url: 'https://cdn-icons-png.freepik.com/128/1196/1196496.png' },
    ];

    const mockDataFruits = [
      { palavra: 'banana', url: 'https://cdn-icons-png.freepik.com/128/9861/9861871.png' },
      { palavra: 'morango', url: 'https://cdn-icons-png.freepik.com/128/590/590685.png' },
      { palavra: 'coco', url: 'https://cdn-icons-png.freepik.com/128/7615/7615411.png' },
      { palavra: 'abacaxi', url: 'https://cdn-icons-png.freepik.com/128/8832/8832776.png' },
      { palavra: 'uva', url: 'https://cdn-icons-png.freepik.com/128/1412/1412542.png' },
      { palavra: 'maçã', url: 'https://cdn-icons-png.freepik.com/128/2106/2106176.png' },
      { palavra: 'laranja', url: 'https://cdn-icons-png.freepik.com/128/418/418239.png' },
      { palavra: 'melancia', url: 'https://cdn-icons-png.freepik.com/128/1054/1054114.png' },
      
    ];

    const mockDataJungle = [
      { palavra: 'tigre', url: 'https://cdn-icons-png.freepik.com/256/6744/6744686.png?ga=GA1.1.527455273.1729003478&semt=ais_hybrid' },
      { palavra: 'leão', url: 'https://cdn-icons-png.freepik.com/256/1998/1998713.png?ga=GA1.1.527455273.1729003478&semt=ais_hybrid' },
      { palavra: 'macaco', url: 'https://cdn-icons-png.freepik.com/256/1998/1998721.png?ga=GA1.1.527455273.1729003478&semt=ais_hybrid' },
      { palavra: 'girafa', url: 'https://cdn-icons-png.freepik.com/256/4215/4215152.png?ga=GA1.1.527455273.1729003478&semt=ais_hybrid' },
      { palavra: 'elefante', url: 'https://cdn-icons-png.freepik.com/128/7743/7743300.png' },
      { palavra: 'formiga', url: 'https://cdn-icons-png.freepik.com/128/4982/4982408.png' },
      { palavra: 'cobra', url: 'https://cdn-icons-png.freepik.com/128/1447/1447876.png' },
    ]

    // Passa os dados para a função de geração de layout
    const crosswordLayout = gerarLayoutCrossword(mockDataFruits);

    // Constrói os dados para o componente `Crossword`
    const newCrosswordData = { across: {}, down: {} };
    crosswordLayout.result.forEach((item, index) => {
      const { startx, starty, answer, clue, orientation } = item;
      const direction = orientation === 'across' ? 'across' : 'down';

      newCrosswordData[direction][index + 1] = {
        clue: <img src={mockDataFruits[index].url} alt={clue} />,
        answer: answer.toUpperCase(),
        row: starty,
        col: startx
      };
    });

    setCrosswordData(newCrosswordData);
  }, []);

  function checkIfSolved() {
    if (crosswordRef.current) {
      const isPuzzleSolved = crosswordRef.current.isCrosswordCorrect();
      setIsSolved(isPuzzleSolved);
    }
  }

  return (
    <div className="crossword-container">
      {/* Header com título e subtítulo */}
      <header className="crossword-header">
        <h1>Palavras Cruzadas</h1>
        <h2>Animais</h2>
      </header>

      <ThemeProvider theme={theme}>
        <CrosswordProvider
          data={crosswordData}
          ref={crosswordRef}
          onCrosswordCorrect={() => setTimeout(checkIfSolved, 0)}
        >
          <div className="crossword-content">
            <DirectionClues direction="across" />
            <div className='crossword-grid'>
              <CrosswordGrid />
            </div>
            <DirectionClues direction="down" />
          </div>
        </CrosswordProvider>
      </ThemeProvider>
      {isSolved && (
        <div className="completion-message">
          Parabéns! Você completou o caça palavras!
        </div>
      )}
    </div>
  );
}
