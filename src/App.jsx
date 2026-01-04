import {React , useState} from 'react'
import Nav from './components/landingPage/Nav'
import Hero from './components/landingPage/Hero'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  About  from './components/landingPage/About.jsx'
import Footer from './components/landingPage/Footer.jsx'
import Register from './components/user/Register.jsx'
import Login from './components/user/Login.jsx';
import Home from './components/user/Home.jsx';
import UserReport from './components/user/UserReport.jsx';
import Form from './components/dashboard/Form.jsx';
import { Toaster } from "react-hot-toast";
import PublicForm from './components/public/PublicForm.jsx';
import UserDetails from "./components/dashboard/UserDetails.jsx"
import Response from './components/user/Response.jsx';
import ProfileSettings from './components/user/ProfileSettings.jsx';
import AllReports from './components/dashboard/AllReports.jsx';
import UserNavbar from './components/user/UserNavbar.jsx';



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
    <Route path="/userreport" element={<UserReport/>}/>
    <Route path="/form" element={<Form/>}/>    
     <Route path="/profile" element={<ProfileSettings />} />
    <Route path='/public/form/:slug' element={<PublicForm/>}/>
    <Route path="/responses/:formId" element={<Response/>}/>
    <Route path="/admindashboard" element={<UserDetails/>}/>
    <Route path="/adminreport" element={<AllReports/>}/>
     </Routes>

 <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
        }}
         containerStyle={{
    top: 60, 
  }}
        />

    </BrowserRouter>
   

  )
}

export default App