import "./App.css";
import Counter from "./src/components/Counter";

function App() {
  const user = { name: "John Doe", email: "john@example.com" };
  return (
    <div>
      <Counter user={user}/>
    </div>
  );
}

export default App;
