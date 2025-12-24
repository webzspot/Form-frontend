import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/landingPage/Nav";
import Hero from "./components/landingPage/Hero";
import About from "./components/landingPage/About";
import Footer from "./components/landingPage/Footer";

import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Home from "./components/user/Home";

import UserDetails from "./components/dashboard/UserDetails";
import Form from "./components/dashboard/Form";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
            </>
          }
        />

        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

      
        <Route path="/dashboard" element={<UserDetails />} />
       
        <Route
          path="/form"
          element={<Form />}
        />
</Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

