import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/Login"
import { AllProductsPage } from "./pages/AllProducts"

import './App.css';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/products" element={<AllProductsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
