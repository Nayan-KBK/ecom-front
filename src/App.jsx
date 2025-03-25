import React, { useEffect, useState } from 'react';
import Navbar from './components/Global/Navbar';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Admin from './components/Admin/Admin';

const App = () => {

  const [currentPage, setCurrentPage] = useState('')
  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []); 


  return (
    <>
     {currentPage !== '/admin' && <Navbar />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>

    </>
  );
};

export default App;
