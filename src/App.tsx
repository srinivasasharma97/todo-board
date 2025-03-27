import Board from "./components/Board";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <Board />
    </TodoProvider>
  );
}

export default App;
