import { useDrag } from "react-dnd";
import { Todo } from "../tsmodels";
import { useRef, useEffect, useState } from "react";
import { useTodos } from "../context/TodoContext";
import EditTodoModal from "./EditTodoModal";

const TodoCard = ({ todo }: { todo: Todo }) => {
  const { removeTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [, drag] = useDrag({
    type: "TODO",
    item: { id: todo.id },
  });

  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dragRef.current) {
      drag(dragRef.current);
    }
  }, [drag]);

  return (
    <div
      ref={dragRef}
      className="bg-white p-4 mb-2 shadow rounded-lg cursor-pointer"
    >
      <h3 className="font-semibold">{todo.todo}</h3>
      <button onClick={() => setIsEditing(true)} className="text-blue-500">
        Edit
      </button>
      <button onClick={() => removeTodo(todo.id)} className="text-red-500 ml-2">
        Delete
      </button>
      {isEditing && (
        <EditTodoModal
          todoId={todo.id}
          currentTitle={todo.todo}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default TodoCard;
