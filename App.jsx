import { useEffect, useRef, useState } from "react";
import Item from "./Item";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const isFirstRender = useRef(true);

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("input is empty");
      return;
    }
    const newTodo = {
      id: Date.now(),
      data: input,
    };
    setTodos([...todos, newTodo]);
    setInput(" ");
    // console.log("this is my todos", todos);
  };
  //

  useEffect(() => {
  const saveTodos=JSON.parse(localStorage.getItem("todos"));
  if(saveTodos)setTodos(saveTodos)
  
   
  }, [])
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="div">
        <div className="app-container">
          <form className="input-container" onSubmit={addTodo}>
            <input
              value={input}
              type="text"
              placeholder="Add a new todo..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button>Add</button>
          </form>
          <ul className="items">
            {todos.map((todo) => (
              <Item
                key={todo.id}
                data={todo.data}
                id={todo.id}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
// 57 minutes
