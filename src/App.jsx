import React, { useEffect, useState } from 'react';
import Navbar from './components/Global/Navbar';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import Checkout from './components/Order/Checkout';
import Payment from './components/Order/Payment';
import ProductDetailPage from './components/ProductOverview/ProductDetailPage';

const App = () => {






  
  
  const product = {
    name: 'Product Name',
    image: 'https://example.com/product-image.jpg', // Replace with your actual image URL
    description: 'This is a great product with awesome features.',
    price: '$49.99',
    variants: [
      {
        name: 'Red',
        price: '$49.99',
      },
      {
        name: 'Blue',
        price: '$54.99',
      },
      {
        name: 'Green',
        price: '$59.99',
      },
    ],
  };
  





  const [currentPage, setCurrentPage] = useState('')
  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []); 


  return (
    <>
     {/* {currentPage !== '/admin' && <Navbar />} */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/productDeatail" element={<ProductDetailPage  product={product} />} />


      </Routes>

    </>
  );
};

export default App;
