import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { fetchTodos, updateTodo, deleteTodo } from "../service";
import { Todo } from "../tsmodels";

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: string) => void;
  editTodo: (id: number, title: string) => void;
  removeTodo: (id: number) => void;
  moveTodo: (id: number, newStatus: Todo["status"]) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      todo: title,
      completed: false,
      status: "Pending",
      isLocal: true,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const editTodo = (id: number, title: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, todo: title } : todo
      )
    );
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit && !todoToEdit.isLocal) {
      updateTodo(id, { todo: title });
    }
  };

  const removeTodo = async (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    const todoToRemove = todos.find((todo) => todo.id === id);
    if (todoToRemove && !todoToRemove.isLocal) {
      await deleteTodo(id);
    }
  };

  const moveTodo = (id: number, newStatus: Todo["status"]) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
    const todoToMove = todos.find((todo) => todo.id === id);
    if (todoToMove && !todoToMove.isLocal) {
      updateTodo(id, { status: newStatus });
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, editTodo, removeTodo, moveTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
