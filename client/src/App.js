import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/Login"
import { ProductsPage } from "./pages/ProductList"

import './App.css';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
