import Crossword, { ThemeProvider } from '@jaredreisinger/react-crossword';

const CrossWord = () => {

  // const data = {
  //   across: {
  //     2: { clue: 'Baleia', answer: 'BALEIA', row: 1, col: 0, },
  //     4: { clue: 'Peixe', answer: 'PEIXE', row: 3, col: 4, },
  //     5: { clue: 'Vaca', answer: 'VACA', row: 6, col: 4 , },
  //   },
  //   down: {
  //     1: { clue: 'Gato', answer: 'GATO', row: 0, col: 1, },
  //     3: { clue: 'Abelha', answer: 'ABELHA', row: 1, col: 5, },
  //     6: { clue: 'Pato', answer: 'PATO', row: 5, col: 7, }
  //   },
  // };

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
    },
  };


  return (
    <div className='container-crossword' style={{ width: '30%' }}>
      <ThemeProvider
        theme={{
          allowNonSquare: true,
          gridBackground: '#acf',
          cellBackground: '#ffe',
          cellBorder: '#fca',
          textColor: '#fff',
          numberColor: '#7AD487',
          focusBackground: '#ff6262',
          highlightBackground: '#f99',
        }}
      >
        <Crossword data={data} />
      </ThemeProvider>
    </div>
  )
}

export default CrossWord;