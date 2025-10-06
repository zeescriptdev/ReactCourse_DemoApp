import "./App.css";
import BuggyComponent from "./src/components/BuggyComponent";
import ErrorBoundary from "./src/components/ErrorBoundary";

function App() {
  
  return (
    <div>
      <ErrorBoundary>
        {/* <div>
          <h1>Hello</h1>
          <button onClick={() => {
            throw new Error("Error");
          }}>Throw Error</button>
        </div> */}
        <BuggyComponent />
      </ErrorBoundary>
    </div>
  );
}

export default App;
