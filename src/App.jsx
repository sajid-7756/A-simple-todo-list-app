import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

// Load todos once on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

// Save todos every time they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!todo.trim()) return;

    if (editId) {
      const updated = todos.map((item) =>
        item.id === editId ? { ...item, todo: todo } : item
      );
      setTodos(updated);
      setEditId(null);
    } else {
      const newTodo = {
        id: uuidv4(),
        todo: todo,
        iscompleted: false,
      };
      setTodos([...todos, newTodo]);
    }

    setTodo("");
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updated = todos.map((item) =>
      item.id === id ? { ...item, iscompleted: !item.iscompleted } : item
    );
    setTodos(updated);
  };

  const handleEdit = (id) => {
    const current = todos.find((item) => item.id === id);
    setTodo(current.todo);
    setEditId(id);
  };

  const handleDelete = (id) => {
    const updated = todos.filter((item) => item.id !== id);
    setTodos(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
          📝 Todo List App
        </h1>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            className="flex-1 border border-cyan-400 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            type="text"
            placeholder="Enter a task..."
          />
          <button
            onClick={handleAdd}
            className={`px-6 py-2 text-white font-semibold rounded-md shadow-md transition-all duration-100 ${
              editId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-cyan-600 hover:bg-cyan-700"
            } transition`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Your Todos
          </h2>
          {todos.length === 0 && (
            <p className="text-gray-500 text-center">No todos to display 😴</p>
          )}

          {todos.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-md px-4 py-3 bg-gray-50 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name={item.id}
                  checked={item.iscompleted}
                  onChange={handleCheckbox}
                  className="w-5 h-5 accent-cyan-600"
                />
                <p
                  className={`text-lg ${
                    item.iscompleted
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {item.todo}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
