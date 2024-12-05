import update from 'immutability-helper';
import { memo, useCallback, useEffect, useState } from 'react';
import { Dustbin } from './Dustbin';
import { Box } from './Box';

const response = [
  { name: 'Maçã', type: 'Maçã', urlFront: 'https://cdn-icons-png.freepik.com/128/1038/1038574.png', urlShadow: 'https://cdn-icons-png.freepik.com/128/1038/1038625.png' },
  { name: 'Banana', type: 'Banana', urlFront: 'https://cdn-icons-png.freepik.com/128/3373/3373057.png', urlShadow: 'https://cdn-icons-png.freepik.com/128/3373/3373054.png' },
  { name: 'Uva', type: 'Uva', urlFront: 'https://cdn-icons-png.freepik.com/128/8719/8719094.png', urlShadow: 'https://cdn-icons-png.freepik.com/128/8719/8719095.png' },
  { name: 'Melancia', type: 'Melancia', urlFront: 'https://cdn-icons-png.freepik.com/128/522/522666.png', urlShadow: 'https://cdn-icons-png.freepik.com/128/522/522768.png' }
];

// Função para embaralhar a lista de boxes
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export const Container = memo(function Container() {
  const initialDustbins = response.map(item => ({
    accepts: [item.type],
    lastDroppedItem: null
  }));

  const [dustbins, setDustbins] = useState(initialDustbins);
  
  // Embaralha os boxes ao inicializar o estado
  const [boxes] = useState(() => shuffleArray(response.map(item => ({
    name: item.name,
    type: item.type,
    url: item.urlFront
  }))));

  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

  const allDustbinsFilled = useCallback(() => {
    return dustbins.every(dustbin => dustbin.lastDroppedItem !== null);
  }, [dustbins]);

  useEffect(() => {
    if (allDustbinsFilled()) {
      alert("Todos os dustbins estão preenchidos!");
    }
  }, [dustbins, allDustbinsFilled]);

  function isDropped(boxName) {
    return droppedBoxNames.includes(boxName);
  }

  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;
      
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: { $set: item }
          }
        })
      );
    },
    [droppedBoxNames, dustbins]
  );

  return (
    <div className="game-dnd-container">
      <div className="dustbins-boxes-container">
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            className="dustbin"
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
            item={response.find(item => item.type === accepts[0])} // Passa o objeto completo do item
          />
        ))}
      </div>

      <div className="dustbins-boxes-container">
        {boxes.map(({ name, type, url }, index) => (
          <Box
            className="box"
            name={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
            srcImage={url}
          />
        ))}
      </div>
    </div>
  );
});
