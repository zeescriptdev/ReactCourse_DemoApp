import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { NotFound, Product, ProductDetails } from "./src/Examples/ReactRouter";

function App() {  
  return <>
    <BrowserRouter>
  {/* <nav>
    <Link to="/user/1">User 1</Link><br />
    <Link to="/user/2">User 2</Link><br />
    <Link to="/user/3">User 3</Link>
  </nav> */}
      <Routes>
        <Route path="/products" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
  
}

export default App;
