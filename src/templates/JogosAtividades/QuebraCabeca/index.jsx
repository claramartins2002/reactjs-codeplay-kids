import {JigsawPuzzle} from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import img from './images/teste.jpg'
import './QuebraCabeca.css';

function PuzzleGame() {
  const onComplete = () => {
    console.log('Puzzle is completed!');
  };

  return (
    <div className="game">
      <JigsawPuzzle
        imageSrc={img}
        rows={4}
        columns={4}
        onSolved={() => alert("Solved!")}
      />
    </div>
  ); 
}

export default PuzzleGame;