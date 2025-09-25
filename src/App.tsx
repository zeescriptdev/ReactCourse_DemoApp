import { createContext } from "react";
import "./App.css";
import ContextAPI from "./src/components/ContextAPI";
import { useWindowWidth } from "./src/hooks/useWindowWidth";
import { useFetch } from "./src/hooks/useFetch";

export const UserContext = createContext({
  name: "John",
  age: 20
});
function App() {
  // const width = useWindowWidth();
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");

  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error: {error}</div>;
  
  return <>
  <UserContext.Provider value={{ name: "John", age: 20 }}>
    {/* <ContextAPI /> */}
    {/* <h2>Window width: {width}px</h2> */}
    <h1>Users length: {data?.length}</h1>
    {
      data?.map((user: any) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.website}</p>
        </div>
      ))
    }
  </UserContext.Provider>
  </>
  
}

export default App;
