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
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import UserActivity from './components/dashboard/UserActivity.jsx';
import AllForms from './components/dashboard/AllForms.jsx';
import AdminFormResponses from './components/dashboard/AdminFormResponses.jsx';
import Reportstatus from './components/user/Reportstatus.jsx';
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
    <Route path="/home" element={
      <ProtectedRoute allowedRoles={["USER"]}>
      <Home/>
      </ProtectedRoute>
      }/>
    <Route path="/userreport" element={
      <ProtectedRoute allowedRoles={["USER"]}>
      <UserReport/>
      </ProtectedRoute>
      }/>
    <Route path="/form" element={
      <ProtectedRoute allowedRoles={["USER"]}>
      <Form/>
      </ProtectedRoute>
     }/>    
    
    <Route path="/reportstatus" element={
      <ProtectedRoute allowedRoles={["USER"]}>
     <Reportstatus/>
      </ProtectedRoute>
      } />





     <Route path="/profile" element={
      <ProtectedRoute allowedRoles={["USER","ADMIN"]}>
      <ProfileSettings />
      </ProtectedRoute>
      } />
    <Route path='/public/form/:slug' element={<PublicForm/>}/>
    <Route path="/responses/:formId" element={
      <ProtectedRoute allowedRoles={["USER"]}>
      <Response/>
      </ProtectedRoute>
      }/>
    <Route path="/admindashboard" element={
     <ProtectedRoute allowedRoles={["ADMIN"]}>
      <UserDetails/>
     </ProtectedRoute>
      
      }/>
      <Route path="/admin/forms" element={
         <ProtectedRoute allowedRoles={["ADMIN"]}>
        <AllForms />
        </ProtectedRoute>
        } />

      <Route
  path="/admin/users/:id/activity"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <UserActivity />
    </ProtectedRoute>
  }
/>
      <Route
  path="/admin/form/:formId/responses"
  element={
  <ProtectedRoute allowedRoles={["ADMIN"]}>
  <AdminFormResponses />
  </ProtectedRoute>
  
  }
/>


    


    <Route path="/adminreport" element={
      <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AllReports/>
      </ProtectedRoute>
      } />
  
  <Route path="/reportstatus" element={
      <ProtectedRoute allowedRoles={["USER"]}>
     <Reportstatus/>
      </ProtectedRoute>
      } />



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