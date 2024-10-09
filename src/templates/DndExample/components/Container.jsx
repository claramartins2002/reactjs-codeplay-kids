import update from 'immutability-helper'
import { memo, useCallback, useEffect, useState } from 'react'
import { ItemTypes } from '../utils/ItemTypes'
import { Dustbin } from './Dustbin'
import { Box } from './Box'
import Squirtle from '../images/squirtle.png'
import Charmander from '../images/charmander.png'
import Bulbasaur from '../images/bulbasaur.png'
import Pikachu from '../images/pikachu.png'

export const Container = memo(function Container() {
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.GRASS], lastDroppedItem: null },
    { accepts: [ItemTypes.WATER], lastDroppedItem: null },
    { accepts: [ItemTypes.FIRE], lastDroppedItem: null },
    { accepts: [ItemTypes.THUNDER], lastDroppedItem: null },
  ])

  const [boxes] = useState([
    { name: 'Squirtle', type: ItemTypes.WATER, url: Squirtle },
    { name: 'Charmander', type: ItemTypes.FIRE, url: Charmander },
    { name: 'Bulbasaur', type: ItemTypes.GRASS, url: Bulbasaur },
    { name: 'Pikachu', type: ItemTypes.THUNDER, url: Pikachu },
  ])

  const [droppedBoxNames, setDroppedBoxNames] = useState([])

  const allDustbinsFilled = useCallback(() => {
    return dustbins.every(dustbin => dustbin.lastDroppedItem !== null);
  }, [dustbins])

  useEffect(() => {
    if (allDustbinsFilled()) {
      alert("Todos os dustbins estão preenchidos!");
    };
  }, [dustbins, allDustbinsFilled]);


  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNames, dustbins],
  )

  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            className="dustbin"
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
            item={boxes.find(item => item.type === accepts[0]).name}
          />
        ))}
      </div>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
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
  )
})
