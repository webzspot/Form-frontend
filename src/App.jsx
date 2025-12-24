import React from 'react'
import Nav from './components/landingPage/Nav'
import Hero from './components/landingPage/Hero'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  About  from './components/landingPage/About.jsx'
import Footer from './components/landingPage/Footer.jsx'
import Register from './components/user/Register.jsx'
import Login from './components/user/Login.jsx';
import Home from './components/user/Home.jsx';


const App = () => {
  return (

    <BrowserRouter>
 <Routes>
   <Route
  path="/" element={
    <>
      <Nav/>
      <Hero/>
     <About/>
     <Footer/>
     </>
  }
     />
    
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/home" element={<Home/>}/>
    
   
     </Routes>
    </BrowserRouter>
   

  )
}

export default App