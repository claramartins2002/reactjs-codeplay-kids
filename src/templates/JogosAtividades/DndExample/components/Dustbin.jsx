import { memo } from "react"
import { useDrop } from "react-dnd"
import '../styles.css';
import { imageMap } from '../utils/ImageConstants';

export const Dustbin = memo(function Dustbin({ accept, lastDroppedItem, onDrop, item }) {
  
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = isOver && canDrop;
  let dustbinClass = 'dustbin-default';

  if (isActive) {
    dustbinClass = 'dustbin-active';
  } else if (canDrop) {
    dustbinClass = 'dustbin-can-drop';
  }

  return (
    <div ref={drop} className={`dustbin ${dustbinClass}`} data-testid="dustbin">
      <img
        src={
          isActive
            ? imageMap[`${item}Shadow`] || ''
            : lastDroppedItem
            ? imageMap[item]
            : imageMap[`${item}Shadow`] || ''
        }
        alt={item}
      />
    </div>
  );
})