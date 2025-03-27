import axios from "axios";
import { Todo } from "./tsmodels";

const API_URL = "https://dummyjson.com/todos";
// import.meta.env.VITE_API_URL;

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<{ todos: Todo[] }>(API_URL);
  return response.data.todos.map((todo) => ({
    ...todo,
    status: todo.completed ? "Completed" : "Pending",
  }));
};

export const updateTodo = async (
  id: number,
  data: Partial<Todo>
): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, data);
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
