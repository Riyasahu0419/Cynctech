import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from './Navbar.'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Products from '../pages/Products'



const AllRoutes = () => {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart/>}/>
  
       
        
    </Routes>
    
    </>
  )
}

export default AllRoutes