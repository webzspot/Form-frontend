import React from "react";
import { BrowserRouter, Routes, Route ,useLocation} from "react-router-dom";

import Nav from "./components/landingPage/Nav";
import Hero from "./components/landingPage/Hero";
import About from "./components/landingPage/About";
import Footer from "./components/landingPage/Footer";

import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Home from "./components/user/Home";
import AdminPage from "./components/dashboard/AdminPage";
import UserDetails from "./components/dashboard/UserDetails";
import Form from "./components/dashboard/Form";
import AllReports from "./components/dashboard/AllReports";

const Layout = () => {
  const location = useLocation();

  return (
    <>
    
      {location.pathname !== "/form" && <Nav />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
                 <Footer />
            </>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<AdminPage />} />
        <Route path="/form" element={<Form />} />
        <Route path="/allreports" element={<AllReports />} />
      </Routes>

   
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;

