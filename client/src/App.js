import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "./graphql/Auth.js";
import { LoginPage } from "./pages/Login"
import { AllProductsPage } from "./pages/AllProducts"
import { UserProductsPage } from "./pages/UserProducts"

import './App.css';
import { EditProductPage } from "./pages/EditProductPage";
import { AddProductForm } from "./pages/AddProductPage/index.jsx";


function App() {

  
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  if(loading){
    return(
      <div className="App">
          Loading
      </div>
    )
  }

  if(error){
    return(
      <div className="App">
          Error
      </div>
    )
  }

  const isLoggedIn = data.isLoggedIn;

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={!isLoggedIn ? <LoginPage /> : <Navigate to='/products' /> } />
            <Route path="/products" element={isLoggedIn ? <AllProductsPage /> : <Navigate to='/' />} />
            <Route path="/userproducts" element={isLoggedIn ? <UserProductsPage /> : <Navigate to='/' />} />
            <Route path="/userproducts/editproduct/:productid" element={isLoggedIn ? <EditProductPage /> : <Navigate to='/' />} />
            <Route path="/userproducts/addproduct" element={isLoggedIn ? <AddProductForm /> : <Navigate to='/' />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
    </div>
  );
}

export default App;
