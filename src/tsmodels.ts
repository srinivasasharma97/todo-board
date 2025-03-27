export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  status: "Pending" | "In Progress" | "Completed";
  isLocal?: boolean;
}

export interface ITodoResults {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}
