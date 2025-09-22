import { createContext } from "react";
import "./App.css";
import ContextAPI from "./src/components/ContextAPI";

export const UserContext = createContext({
  name: "John",
  age: 20
});
function App() {
  return <>
  <UserContext.Provider value={{ name: "John", age: 20 }}>
    <ContextAPI />
  </UserContext.Provider>
  </>
  
}

export default App;
