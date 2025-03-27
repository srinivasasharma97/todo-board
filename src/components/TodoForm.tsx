import { useState } from "react";
import { useTodos } from "../context/TodoContext";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      addTodo(todo);
      setTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="p-2 border rounded"
        placeholder="Add a new todo"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
