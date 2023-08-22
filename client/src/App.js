import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { LoginPage } from "./pages/Login"
import { AllProductsPage } from "./pages/AllProducts"
import { client } from "./graphql/client";


import './App.css';


function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/products" element={<AllProductsPage />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
