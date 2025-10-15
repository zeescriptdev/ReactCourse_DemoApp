import { Provider } from "react-redux";
import { store } from "./src/store/store";
import "./App.css";
import Counter from "./src/components/Counter";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
