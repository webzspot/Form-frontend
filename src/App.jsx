import React from 'react'
import Nav from './components/landingPage/Nav'
import Hero from './components/landingPage/Hero'
import { BrowserRouter } from 'react-router-dom'
import  About  from './components/landingPage/About.jsx'
import Footer from './components/landingPage/Footer.jsx'
const App = () => {
  return (

    <BrowserRouter>
      <Nav/>
      <Hero/>
     <About/>
     <Footer/>
    </BrowserRouter>
   

  )
}

export default App