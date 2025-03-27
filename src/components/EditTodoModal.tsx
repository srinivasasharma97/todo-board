import { useState } from "react";
import { useTodos } from "../context/TodoContext";

interface EditTodoModalProps {
  todoId: number;
  currentTitle: string;
  onClose: () => void;
}

const EditTodoModal = ({
  todoId,
  currentTitle,
  onClose,
}: EditTodoModalProps) => {
  const [title, setTitle] = useState(currentTitle);
  const { editTodo } = useTodos();

  const handleSave = () => {
    editTodo(todoId, title);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
      <div className="bg-white p-4 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold">Edit Todo</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="p-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
