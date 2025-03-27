import Lane from "../components/Lane";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoForm from "../components/TodoForm";

const Board = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <TodoForm />
        <div className="flex gap-4">
          <Lane status="Pending" />
          <Lane status="In Progress" />
          <Lane status="Completed" />
        </div>
      </div>
    </DndProvider>
  );
};

export default Board;
