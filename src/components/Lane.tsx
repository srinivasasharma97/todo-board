import { useRef } from "react";
import { useTodos } from "../context/TodoContext";
import TodoCard from "./TodoCard";
import { useDrop } from "react-dnd";

interface LaneProps {
  status: "Pending" | "In Progress" | "Completed";
}

const Lane = ({ status }: LaneProps) => {
  const { todos, moveTodo } = useTodos();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "TODO",
    drop: (item: { id: number }) => moveTodo(item.id, status),
  });

  drop(ref);

  return (
    <div ref={ref} className="w-1/3 p-2 bg-gray-100 rounded-lg min-h-[300px]">
      <h2 className="text-xl font-bold mb-4">{status}</h2>
      {todos
        .filter((todo) => todo.status === status)
        .map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
    </div>
  );
};

export default Lane;
