import { useState } from "react";
import "./App.css";
import Counter from "./src/Examples/PerformaceCounter";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  return (
    <div>
      <Counter count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

export default App;
