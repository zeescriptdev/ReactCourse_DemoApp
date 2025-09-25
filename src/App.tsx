import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Contact, Home, NotFound } from "./src/Examples/ReactRouter";

function App() {  
  return <>
    <BrowserRouter>
  {/* <nav>
    <Link to="/">Home</Link><br />
    <Link to="/about">About</Link><br />
    <Link to="/contact">Contact</Link>
  </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
  
}

export default App;
