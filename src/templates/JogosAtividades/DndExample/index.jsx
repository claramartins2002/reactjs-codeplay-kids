import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./components/Container";

function DndExample() {
  return (
    <div className="dnd-example">
      <DndProvider backend={HTML5Backend}>
        <Container/>
      </DndProvider>
    </div>
  )
}

export default DndExample;